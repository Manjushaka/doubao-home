//  文章网址：https://www.robinwieruch.de/react-hooks-fetch-data/
import React, { Fragment, useState, useEffect, useReducer } from "react";
import axios from "axios";

const useDataApi = (initialUrl, initialData) => {
    const [data, setData] = useState(initialData);
    const [url, setUrl] = useState(initialUrl);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchData = async function() {
            setIsLoading(true);
            setIsError(false);
            try {
                const result = await axios(url);
                // console.log("result: ", result);
                setData(result.data);
            } catch (error) {
                setIsError(true);
            }

            setIsLoading(false);
        };

        const p = fetchData().then(res => {
            console.log("then: ", res);
        });

        // console.log("p: ", p);
    }, [url]);

    const doFetch = url => {
        setUrl(url);
    };

    return { data, isLoading, isError, doFetch };
};

const dataFetchReducer = (state, action) => {
    switch (action.type) {
      case 'FETCH_INIT':
        return {
          ...state,
          isLoading: true,
          isError: false
        };
      case 'FETCH_SUCCESS':
        return {
          ...state,
          isLoading: false,
          isError: false,
          data: action.payload,
        };
      case 'FETCH_FAILURE':
        return {
          ...state,
          isLoading: false,
          isError: true,
        };
      default:
        throw new Error();
    }
  };

const useDataApiWithReducer = (initialUrl, initialData) => {
    const [url, setUrl] = useState(initialUrl);

    const [state, dispatch] = useReducer(dataFetchReducer, {
        isLoading: false,
        isError: false,
        data: initialData
    });

    useEffect(() => {
        const fetchData = async () => {
            dispatch({type: 'FETCH _INIT'});

            try {
                const result = await axios(url);

                dispatch({
                    type: 'FETCH_SUCCESS',
                    payload: result.data
                })
            } catch (error) {
                dispatch({
                    type: 'FETCH_FAILURE',
                });
            }
        }

        fetchData()
    }, [url]);

    const doFetch = url => { setUrl(url) };

    return {...state, doFetch}
}

function FetchDataWithHooks(params) {
    const [query, setQuery] = useState("redux");
    const { data, isLoading, isError, doFetch } = useDataApi(
        "https://hn.algolia.com/api/v1/search?query=redux",
        { hits: [] }
    );

    return (
        <Fragment>
            <form
                onSubmit={e => {
                    console.log("form");
                    doFetch(
                        `https://hn.algolia.com/api/v1/search?query=${query}`
                    );
                    e.preventDefault();
                }}
            >
                <input
                    type="text"
                    value={query}
                    onChange={event => setQuery(event.target.value)}
                />
                <button type="submit">Search</button>
            </form>
            {isError && <div>something went wrong ...</div>}
            {isLoading ? (
                <div>Loading ...</div>
            ) : (
                <ul>
                    {data.hits.map(item => (
                        <li key={item.objectID}>
                            <a href={item.url}>{item.title}</a>
                        </li>
                    ))}
                </ul>
            )}
        </Fragment>
    );
}

export default FetchDataWithHooks;
