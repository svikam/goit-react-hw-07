import s from "./ContactList.module.css";
import Contact from "../Contact/Contact";
import { useSelector } from "react-redux";
import { selectContacts } from "../../redux/contactsSlice";
import { selectNameFilter } from "../../redux/filtersSlice";

const ContactList = () => {
    const contacts = useSelector(selectContacts);
    const filter = useSelector(selectNameFilter);
    const filterData = contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()));
    return (
        <ul className={s.list}>
            {filterData.map(contact => (
                <li key={contact.id} className={s.card}>
                    <Contact
                        id={contact.id}
                        name={contact.name}
                        number={contact.number}
                    />
                </li>
            ))}
        </ul> 
    );
};

export default ContactList;