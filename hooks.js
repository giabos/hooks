
import { React } from 'https://unpkg.com/es-react';

const {useState, useEffect} = React;


export const useLocalStorage = (keyName, defaultValue) => {
    const [storedValue, setStoredValue] = React.useState(() => {
        try {
            const value = window.localStorage.getItem(keyName);

            if (value) {
                return JSON.parse(value);
            } else {
                window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
                return defaultValue;
            }
        } catch (err) {
            return defaultValue;
        }
    });

    const setValue = newValue => {
        try {
            window.localStorage.setItem(keyName, JSON.stringify(newValue));
        } catch (err) { }
        setStoredValue(newValue);
    };

    return [storedValue, setValue];
};   



export const useFetch = (url, options={}) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        setData(null);
        setError(null);
        fetch(url, options)
        .then((res) => res.json())
        .then((data) => setData(data))
        .catch((err) => setError(err))
        .finally(() => setLoading(false));
    }, [url]);
    return {data, loading, error};
};