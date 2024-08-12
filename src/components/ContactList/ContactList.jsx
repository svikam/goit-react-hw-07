import s from "./ContactList.module.css";
import Contact from "../Contact/Contact";
import { useSelector } from "react-redux";
import { selectFilteredContacts } from "..//../redux/contactsSlice";

const ContactList = () => {
    const filteredContacts = useSelector(selectFilteredContacts);
    return (
        <ul className={s.list}>
            {filteredContacts.map(contact => (
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