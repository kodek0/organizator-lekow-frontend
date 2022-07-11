import React, {useState} from 'react';

export const Drug = (props) => {
    const [showDesc, setShowDesc] = useState(false);

    const {id, title, description, date, onDelete, onEdit} = props;

    const deleteItemDrug = () => {
        onDelete(id);
    }

    const toggleDesc = () => {
        setShowDesc(!showDesc);
    }

    const editHandler = () => {
        onEdit({
            _id: id,
            title,
            description,
            date
        });
    }

    return (
        <div className="drug">
            <p onClick={toggleDesc}>{title}</p>
            {showDesc &&
            <div>
                <div className="description">{description}</div>
                <div className="date">{date}</div>
            </div>
            }
            <button onClick={editHandler}>Edytuj</button>
            <button className="delete" onClick={deleteItemDrug}>Usuń</button>
        </div>
    );
}

