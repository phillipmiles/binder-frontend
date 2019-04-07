import axios from 'axios';

// TODO: Move domain into an ENV variable.
// if (process.env.NODE_ENV === 'production' || process.env.FORCE_PROD_API === 'true') {
//     // console.log('hello kitty', process.env.FORCE_PROD_API);
//     var domain = 'http://binder.ap-southeast-2.elasticbeanstalk.com';
// } else {
//     var domain = '';
// }

var domain = process.env.REACT_APP_API_URL;

export const login = (user) => {
    return axios.post(domain + '/api/user/login', {
        username: user.username,
        password: user.password,
    }, {
        withCredentials: true
    })
      .then(
        response => response,
        error => {
            console.log('An error occurred.', error.response.data)
            throw error.response.data;
        }
    )
};



export const logout = () => {
    return axios.get(domain + '/api/user/logout', {
        withCredentials: true
    })
      .then(
        response => response,
        error => {
            console.log('An error occurred.', error.response.data)
            throw error.response.data;
        }
    )
};


export const register = (user) => {
    return axios.post(domain + '/api/user', {
        email: user.email,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName
    }, {
        withCredentials: true
    })
      .then(
        response => response,
        error => {
            console.log('An error occurred.', error.response.data)
            throw error.response.data;
        }
    )
};



export const requestWebsocketToken = () => {
    return axios.get(domain + '/api/user/share', { 
        withCredentials: true
    })
      .then(
        response => response,
        error => {
            console.log('An error occurred.', error.response.data)
            throw error.response.data;
        }
    )
};

export const openWebsocket = (url) => {
    return new WebSocket(url);
};


export const fetchUserNodes = (userId) => {
    return axios.get(`${domain}/api/users/${userId}/nodes`, { 
        withCredentials: true
    })
      .then(
        response => response,
        error => {
            console.log('An error occurred.', error.response.data)
            throw error.response.data;
        }
    )
};


export const fetchWorkspaces = (userId) => {
    return axios.get(`${domain}/api/users/${userId}/workspaces`, { 
        withCredentials: true
    })
      .then(
        response => response,
        error => {
            console.log('An error occurred.', error.response.data)
            // if(error.response.data.code === 401) { routeToLogin() }
            // throw Error(error.response.data.message);
            // return error;
            // var errortest = new Error(error.response.data.message)
            throw error.response.data;
        }
    )
};

// export const fetchWorkspaceNodes = (workspaceId) => {
//     return axios.get(`/api/workspace/${workspaceId}`, { withCredentials: true})
//       .then(
//         response => response,
//         error => {
//             console.log('An error occurred.', error.response.data)
//             throw error.response.data;
//         }
//     )
// };

// Fetches all workspace nodes for a given user.
export const fetchWorkspaceNodes = (userId) => {
    return axios.get(`${domain}/api/users/${userId}/nodes`, { 
        withCredentials: true
    })
      .then(
        response => response,
        error => {
            // TODO: Error handling currently doesn't handle when the server isn't running.
            // It's a different error object in that instance.
            console.log('An error occurred.', error.response.data)
            throw error.response.data;
        }
    )
};

// Fetches all workspace nodes for a given user.
export const fetchBinnedNodes = (userId) => {
    return axios.get(`${domain}/api/users/${userId}/bin`, { 
        withCredentials: true
    })
      .then(
        response => response,
        error => {
            // TODO: Error handling currently doesn't handle when the server isn't running.
            // It's a different error object in that instance.
            console.log('An error occurred.', error.response.data)
            throw error.response.data;
        }
    )
};

export const binNode = (nodeId) => {
    return axios.post(`${domain}/api/node/${nodeId}/bin`, { 
      
    }, {
        withCredentials: true
    })
    .then(
        response => response,
        error => {
            console.log('An error occurred.', error.response.data)
            throw error.response.data;
        }
    )
}

export const addWorkspace = (title) => {
    return axios.post(`${domain}/api/workspace`, {
        title: title,
    }, {
        withCredentials: true
    })
    .then(
        response => response,
        error => {
            console.log('An error occurred.', error.response.data)
            throw error.response.data;
        }
    )
};

// export const addWorkspaceNode = (workspaceId) => {
//     return axios.get(`/api/workspace/${workspaceId}`, { withCredentials: true})
//       .then(
//         response => response,
//         error => {
//             console.log('An error occurred.', error.response.data)
//             throw error.response.data;
//         }
//       )
// };

export const addWorkspaceNode = (parentNodeId, nodeType, title, index) => {
    return axios.post(`${domain}/api/node`, {
        parentNodeId,
        index,
        nodeType,
        title
    }, {
        withCredentials: true
    })
      .then(
        response => response,
        error => {
            console.log('An error occurred.', error.response.data)
            throw error.response.data;
        }
      )
};


export const moveNode = (nodeId, moveToParentNodeId, moveToIndex) => {
    return axios.patch(`${domain}/api/node/${nodeId}`, {
        parentNodeId: moveToParentNodeId,
        index: moveToIndex
    }, {
        withCredentials: true
    })
      .then(
        response => response,
        error => {
            console.log('An error occurred.', error.response.data)
            throw error.response.data;
        }
      )
};

export const editNodeContentTitle = (nodeId, newTitle) => {
    return axios.put(`${domain}/api/node/${nodeId}`, {
        title: newTitle
    }, {
        withCredentials: true
    })
    .then(
        response => response,
        error => {
            console.log('An error occurred.', error.response.data)
            throw error.response.data;
        }
    )
};