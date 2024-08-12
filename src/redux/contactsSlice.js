import { createSelector, createSlice, isAnyOf } from "@reduxjs/toolkit"
import { fetchContacts, deleteContact, addContact } from "../redux/contactsOps";
import { selectNameFilter } from "./filtersSlice";

const initialState = {
    // items: [
    //     { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    //     { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    //     { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    //     { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    // ],
    items: [],
    loading: false,
    error: null
};

const contactsSlice = createSlice({
    name: "contacts",
    initialState,
    extraReducers: builder => { 
        builder
            .addCase(fetchContacts.fulfilled, (state, action) => {
                state.items = action.payload;
            })
            .addCase(deleteContact.fulfilled, (state, action) => {
                state.items = state.items.filter(item => item.id !== action.payload);
            })
            .addCase(addContact.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addMatcher(isAnyOf(fetchContacts.pending, deleteContact.pending, addContact.pending), state => {
                state.loading = true;
                state.error = false;
            })
            .addMatcher(isAnyOf(fetchContacts.rejected, deleteContact.rejected, addContact.rejected), state => {
                state.loading = false;
                state.error = true;
            })
            .addMatcher(isAnyOf(fetchContacts.fulfilled, deleteContact.fulfilled, addContact.fulfilled), state => {
                state.loading = false;
            });
    },
});

export const selectContacts = state => state.contacts.items; 
export const selectLoading = state => state.contacts.loading;
export const selectError = state => state.contacts.error;

export const selectFilteredContacts = createSelector([selectContacts, selectNameFilter], (contacts, filter) => contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase()))
);

export const contactsReducer = contactsSlice.reducer;
// export const { addContact, deleteContact } = contactsSlice.actions;
