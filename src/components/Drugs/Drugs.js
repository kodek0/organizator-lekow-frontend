import React, {useState, useEffect} from 'react';
import './Drugs.css';
import {Drug} from "./Drug/Drug";
import {NewDrug} from "../NewDrug/NewDrug";
import {EditDrug} from "../EditDrug/EditDrug";
import {fetchURL} from '../../fetchURL';
import Modal from 'react-modal';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

export const Drugs = () => {
    /*const drugs = [
        {
            id: '1212',
            title: 'Rutinoscorbin',
            description: 'Rutinoscorbin przyjmuj 2x dziennie';
            date: '2022-07-01',
        },
        {
            id: '2312',
            title: 'Witamina C',
            description: 'Witamine C przyjmuj 200mg dziennie',
            date: '2022-07-02',
        }
    ];*/

    const [drug, setDrug] = useState([]);
    const [editModal, setEditModal] = useState(false);
    const [editDrug, setEditDrug] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                await fetch(`${fetchURL.baseURL}/drugs`)
                    .then(response => {
                        return response.json();
                    })
                    .then(drugBase => {
                        console.log('data', drugBase)
                        setDrug(drugBase);
                    });
            } catch (err) {
                setError('Loading error...');
            }
        })();
    }, []);

    if (error) {
        return <p>{error}</p>;
    }

    const deleteDrug = async (id) => {
        console.log('usuwanie leku ', id);
        await fetch(`${fetchURL.baseURL}/drugs/` + id, {
            method: 'DELETE',
        });
        setDrug(drug => drug.filter(item => item._id !== id));
    }

    const addDrug = async (newDrug) => {
        const drugs = [...drug];
        try {
            const res = await fetch(`${fetchURL.baseURL}/drugs`, {
                method: 'POST',
                body: JSON.stringify(newDrug),
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const newDrugFromBackend = await res.json();
            if (newDrugFromBackend.status === 422) {
                throw new Error(`${newDrugFromBackend.message}`);
            }
            drugs.push(newDrugFromBackend);
            setDrug(drugs);
        } catch (error) {
            NotificationManager.error(error.message);
        }
    }

    const editOneDrug = async (editOneItem) => {
        console.log('Edycja', editOneItem);
        await fetch(`${fetchURL.baseURL}/drugs/` + editOneItem._id, {
            method: 'PUT',
            body: JSON.stringify(editOneItem),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const drugs = [...drug];
        const index = drugs.findIndex(item => item._id === editOneItem._id);
        if (index >= 0) {
            drugs[index] = editOneItem;
        }
        setDrug(drugs);
        toggleModal();
    }

    const toggleModal = () => {
        setEditModal(!editModal);
    }

    const editDrugHandler = (drug) => {
        toggleModal();
        setEditDrug(drug);
    }

    return (
        <div>
            <div>
                <NotificationContainer/>
            </div>

            <p>Moje lekarstwa:</p>

            <NewDrug onDrug={addDrug}/>

            <Modal
                isOpen={editModal}
                contentLabel="Edit Drugs"
                ariaHideApp={false}
            >
                <EditDrug
                    id={editDrug._id}
                    title={editDrug.title}
                    description={editDrug.description}
                    date = {editDrug.date}
                    onEdit={(editItem) => editOneDrug(editItem)}
                />
                <button onClick={toggleModal}>Anuluj</button>
            </Modal>

            {drug.map(drug => <Drug
                key={drug._id}
                id={drug._id}
                title={drug.title}
                description={drug.description}
                date = {drug.date}
                onDelete={deleteDrug}
                onEdit={editDrugHandler}
            />)}
        </div>
    );
}