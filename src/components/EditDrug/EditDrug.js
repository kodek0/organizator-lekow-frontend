import React, {useState} from 'react';

export const EditDrug = (props) => {
    const {id, title, description, date, onEdit} = props;

    const minDate = new Date().toISOString().slice(0, 10);
    let maxDate = minDate.slice(0, 4) * 1 + 1;
    maxDate = maxDate + '-07-10';

    const [editTitle, setEditTitle] = useState(title);
    const [editDesc, setEditDesc] = useState(description);
    const [editDate, setEditDate] = useState(date);

    const editTitleHandler = (event) => {
        const newEditTitle = event.target.value;
        setEditTitle(newEditTitle);
    }

    const editDescHandler = (event) => {
        const newEditDesc = event.target.value;
        setEditDesc(newEditDesc);
    }

    const changeDateHandler = (event) => {
        const newDate = event.target.value;
        setEditDate(newDate);
    }

    const editOneDrugHandler = () => {
        onEdit({
            _id: id,
            title: editTitle,
            description: editDesc,
            date: editDate,
        });
    }

    return (
        <div className="drug">
            <label htmlFor="text-title">Nazwa leku:</label>
            <input
                id="text-title"
                type="text"
                value={editTitle}
                onChange={editTitleHandler}
            />

            <label htmlFor="text-desc">Zalecane przyjmowanie:</label>
            <input
                id="text-desc"
                type="text"
                value={editDesc}
                onChange={editDescHandler}
            />

            <label>Kiedy przyjąć lek?</label>
            <input
                id="date"
                type="date"
                value={editDate}
                min={minDate}
                max={maxDate}
                onChange={changeDateHandler}
            />

            <button onClick={editOneDrugHandler}>Edytuj/Zapisz</button>
        </div>
    );
}