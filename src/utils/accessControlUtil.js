import { getAccessControlDetails } from "../firebase/accessControlService";
import { getUserDetailsFromDbById } from "../firebase/dbUserDetailService";
import { useAuth } from "../contexts/AuthContextProvider";
import { async } from "@firebase/util";

function userIsAdmin(userDetailsFromDb) {
    var matchedRoles = userDetailsFromDb.roles.filter((userRole)=>{
        return userRole.name === "admin";
    })

    return matchedRoles.length > 0;
}

function entityHasAllRole(entityRole) {
    return entityRole.name === "all";
}

export async function doesUserHaveAccessToEntity(args) {
    let {userDetailsFromDb, loggedInUser} = args;
    userDetailsFromDb = userDetailsFromDb || await getUserDetailsFromDbById(loggedInUser.uid);

    var userHasAccess = false;

    if(userIsAdmin(userDetailsFromDb)) {
        userHasAccess = true;
    }

    var params = {entity: args.entity, entityType: args.entityType};
    var accessControlList = await getAccessControlDetails(params);

    userHasAccess || accessControlList.forEach((accessControl) => {
        accessControl.roles.forEach((accessRole)=>{
            if(entityHasAllRole(accessRole)){
                // return true;
                userHasAccess = true;
            }
            console.debug("accessRole: ", accessRole);
            var matchedRoles = userDetailsFromDb.roles.filter((userRole) => {
                // console.debug("userRole.id: ", userRole.id, " accessRole.id: ", accessRole.id);
                return userRole.id == accessRole.id;
            });
            console.debug("matchedRoles: ", matchedRoles);
            if (matchedRoles.length > 0) {
                // setHasPageAccess(true);
                
                // return true;
                userHasAccess = true;
            }
        })
    });

    if(userHasAccess){
        console.debug("User has access to this page");
    } else {
        console.debug("User does not have access to this page");
    }
    return userHasAccess;
}

export function userHasAccessToPage(args) {
    // const {loggedInUser} = useAuth();
    // const userDetailsFromDb = {};
    const loggedInUser = args.loggedInUser;
    console.debug("userHasAccessToPage args: ", args);
    
    return getUserDetailsFromDbById(loggedInUser.uid).then((userDetailsFromDb)=>{
        // console.debug("User details: ", userDetailsFromDb);
        // setUserDetails(response);
        // userDetailsFromDb = response;

        if(userIsAdmin(userDetailsFromDb)) {
            // userHasAccess = true;
            return true;
        }

        var params = {entity: args.entity, entityType: args.entityType};
        
        return getAccessControlDetails(params).then(function (accessControlList) {
            console.debug("accessControlList: ", accessControlList);
            var userHasAccess = false;
            accessControlList.forEach((accessControl) => {
                accessControl.roles.forEach((accessRole)=>{
                    if(entityHasAllRole(accessRole)){
                        // return true;
                        userHasAccess = true;
                    }
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