import React from 'react';

const FetchError = ({ message, onRetry }) => (
     <div>
         <p>An error has occured. {message}</p>
         <button onClick={onRetry}>Retry</button>
    </div>
);

export default FetchError;