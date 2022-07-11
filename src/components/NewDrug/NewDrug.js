import React, {useState} from 'react';
import {v4 as uuid} from 'uuid';

export const NewDrug = (props) => {
    const {onDrug} = props;

    const minDate = new Date().toISOString().slice(0, 10);
    let maxDate = minDate.slice(0, 4) * 1 + 1;
    maxDate = maxDate + '-07-10';

    const [showForm, setShowForm] = useState(false);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [dateDrug, setDate] = useState(minDate);

    const addTitleHandler = (event) => {
        const newTitle = event.target.value;
        setTitle(newTitle);
    }

    const addDescHandler = (event) => {
        const newDesc = event.target.value;
        setDesc(newDesc);
    }

    const changeDateHandler = (event) => {
        const newDate = event.target.value;
        setDate(newDate);
    }

    const addOneDrugHandler = () => {
        onDrug({
            _id: uuid(),
            title,
            description: desc,
            date: dateDrug,
        });
        setTitle('');
        setDesc('');
        setDate(minDate);
        setShowForm(false);
    }

    const cancelDrugHandler = () => {
        setShowForm(!showForm);
    }

    return (
        showForm ? (
            <div className="drug">
                <label htmlFor="text-title">Nazwa leku:</label>
                <input
                    id="text-title"
                    type="text"
                    value={title}
                    onChange={addTitleHandler}
                />

                <label htmlFor="text-desc">Zalecane przyjmowanie:</label>
                <input
                    id="text-desc"
                    type="text"
                    value={desc}
                    onChange={addDescHandler}
                />
                <label htmlFor="date">Kiedy przyjąć lek?</label>
                <input
                    id="date"
                    type="date"
                    value={dateDrug}
                    min={minDate}
                    max={maxDate}
                    onChange={changeDateHandler}
                />

                <button onClick={addOneDrugHandler}>Dodaj Nowe Lekarstwo</button>
                <button onClick={cancelDrugHandler}>Anuluj</button>
            </div>
        ) : (<button onClick={() => setShowForm(true)}>Nowy Lek</button>)
    );
}