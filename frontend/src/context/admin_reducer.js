const AdminReducer = (state, action) => {
    switch (action.type) {
        case "ADMIN" : {
            return {
                isAdmin : true,
            };
        }
        case "NOTADMIN" : {
            return {
                isAdmin : false,
            };
        }
        default :
            return state;
    }
};

export default AdminReducer;