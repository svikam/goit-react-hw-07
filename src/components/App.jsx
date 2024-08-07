import ContactForm from './ContactForm/ContactForm';
import SearchBox from './SearchBox/SearchBox';
import ContactList from './ContactList/ContactList';
import { useDispatch, useSelector } from 'react-redux';
import { selectNameFilter, changeFilter } from "../redux/filtersSlice";
import { addContact, deleteContact, selectContacts } from "../redux/contactsSlice";

const App = () => {
    const contacts = useSelector(selectContacts);
    const filter = useSelector(selectNameFilter);
    const dispatch = useDispatch();
    const visibleContacts = contacts.filter((contact) =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
    );
    // const initialContacts = [
    //     { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    //     { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    //     { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    //     { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    // ];
    // useEffect(() => {
    //     if (contacts.length === 0) {
    //         dispatch(setInitialContacts(initialContacts));
    //     }
    // }, [contacts, dispatch]);
    const handleAddContact = (newContact) => {
        dispatch(addContact(newContact));
    };
    const handleDeleteContact = (id) => {
        dispatch(deleteContact(id));
    };
    const handleSearch = (search) => {
        dispatch(changeFilter(search));
    };

    return (
        <div>
            <h1>Phonebook</h1>
            <ContactForm onAdd={handleAddContact} />
            <SearchBox value={filter} onFilter={handleSearch} />
            <ContactList contacts={visibleContacts} onDelete={handleDeleteContact} />
        </div>
    );
};

export default App;