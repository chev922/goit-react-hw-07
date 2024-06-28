import { createSelector, createSlice } from "@reduxjs/toolkit";
import { fetchContacts, addContact, deleteContact } from "./contactsOps";
import { selectTextFilter } from "./filtersSlice";

const slice = createSlice({
    name: "contacts",
    initialState: {
        items: [],
        loading: {
            get: false,
            add: false,
        },
        error: false,
    },
    extraReducers: (builder) =>
        builder
            .addCase(fetchContacts.pending, (state) => {
                state.loading.get = true;
                state.error = false;
            })
            .addCase(fetchContacts.fulfilled, (state, action) => {
                state.items = action.payload;
                state.loading.get = false;
            })
            .addCase(fetchContacts.rejected, (state) => {
                state.error = true;
                state.loading.get = false;
            })
            .addCase(addContact.pending, (state) => {
                state.loading.add = true;
                state.error = false;
            })
            .addCase(addContact.fulfilled, (state, action) => {
                state.loading.add = false;
                state.items.push(action.payload);
            })
            .addCase(addContact.rejected, (state) => {
                state.loading.add = false;
                state.items = [];
                state.error = true;
            })
            .addCase(deleteContact.pending, (state) => {
                state.error = false;
            })
            .addCase(deleteContact.fulfilled, (state, action) => {
                state.items = state.items.filter(
                    (item) => item.id !== action.payload.id
                );
            })
            .addCase(deleteContact.rejected, (state) => {
                state.error = true;
                state.items = [];
            }),
});

export const selectItems = (state) => state.contacts.items;

export const selectLoadGet = (state) => state.contacts.loading.get;

export const selectLoadAdd = (state) => state.contacts.loading.add;

export const selectError = (state) => state.contacts.error;

export const selectFilteredContacts = createSelector(
    [selectItems, selectTextFilter],
    (contacts, textFilter) => {
        return contacts.filter((contact) =>
            contact.name
                ? contact.name.toLowerCase().includes(textFilter.toLowerCase())
                : selectItems
        );
    }
);

export default slice.reducer;