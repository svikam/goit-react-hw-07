import { useDispatch } from 'react-redux';
import s from './Contact.module.css';
import { FaUser, FaPhoneAlt } from "react-icons/fa";
import { deleteContact } from "..//../redux/contactsSlice";

const Contact = ({ id, name, number }) => {
    const dispatch = useDispatch();
    return (
        <div className={s.wrapper}>
            <div>
                <p>
                    <FaUser className={s.icon} />{name}
                </p>
                <p>
                    <FaPhoneAlt className={s.icon}/>{number}
                </p>
            </div>
            <button className={s.btn} onClick={() => dispatch(deleteContact(id))}>
                Delete
            </button>
        </div>
    )
}

export default Contact;