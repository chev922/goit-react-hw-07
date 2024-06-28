import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://667e951ff2cb59c38dc6421b.mockapi.io/api/v1";

export const fetchContacts = createAsyncThunk(
    "fetchAllContacts",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get("/contacts");
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const addContact = createAsyncThunk(
    "addContact",
    async (newContact, thunkAPI) => {
        try {
            const response = await axios.post("/contacts", newContact);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const deleteContact = createAsyncThunk(
    "deleteContact",
    async (contactId, thunkAPI) => {
        try {
            const response = await axios.delete(`/contacts/${contactId}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const filterContact = createAsyncThunk(
    "filterContacts",
    async (query, thunkAPI) => {
        try {
            const response = await axios.get("/contacts");
            const filteredContacts = response.data.filter((contact) =>
                contact.name.toLowerCase().includes(query.toLowerCase())
            );
            return filteredContacts;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);