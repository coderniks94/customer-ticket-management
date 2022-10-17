import { getAccessControlDetails } from "../firebase/accessControlService";
import { getUserDetailsFromDbById } from "../firebase/dbUserDetailService";
import { useAuth } from "../contexts/AuthContextProvider";


export function userHasAccessToPage(args) {
    // const {loggedInUser} = useAuth();
    // const userDetailsFromDb = {};
    const loggedInUser = args.loggedInUser;
    
    return getUserDetailsFromDbById(loggedInUser.uid).then((userDetailsFromDb)=>{
        console.debug("User details: ", userDetailsFromDb);
        // setUserDetails(response);
        // userDetailsFromDb = response;

        // var args = {
        //     entity: "customer-tickets",
        //     entityType: "page"
        // }

        var params = {entity: args.entity, entityType: args.entityType};
        
        return getAccessControlDetails(params).then(function (accessControlList) {
            console.debug("accessControlList: ", accessControlList);
            var userHasAccess = false;
            accessControlList.forEach((accessControl) => {
                accessControl.roles.forEach((accessRole)=>{
                    console.debug("accessRole: ", accessRole);
                    var matchedRoles = userDetailsFromDb.roles.filter((userRole) => {
                        console.debug("userRole.id: ", userRole.id, " accessRole.id: ", accessRole.id);
                        return userRole.id == accessRole.id;
                    });
                    console.debug("matchedRoles: ", matchedRoles);
                    if (matchedRoles.length > 0) {
                        // setHasPageAccess(true);
                        
                        // return true;
                        userHasAccess = true;
                    }
                    // return false;
                })
                
            });
            if(userHasAccess){
                console.debug("User has access to this page");
            } else {
                console.debug("User does not have access to this page");
            }
            return userHasAccess;
            // setIsLoading(false);
        })
    })
    
}