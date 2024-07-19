import Layout from '../components/Layouts/Layout.js';
import React from 'react';
import { useSearch } from '../contxt/search.js';  // Import the search context
import Productcards from '../components/Layouts/productcards.js';

function Search() {
  const [values] = useSearch();  // Use the search context to get the current values

  return (
    <Layout>
      {/* <div>Search</div> */}
      <h3>{values?.results.length < 1 ? 'No Product Found' : `Found: ${values.results.length}`}</h3>
      <div>
      <div className=''>
          <h1 className='text-center'>All products</h1>
          <div className='d-flex flex-wrap'>
            <Productcards products={values?.results} />
          </div>
          <div className='m-2 p-3'></div>
        </div>
      </div>
    </Layout>
  );
}

export default Search;
