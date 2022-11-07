import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { getAllRoles } from "../firebase/roleService";

export default function AccessControlPage() {
    const [entity, setEntity] = useState("");
    const [entityType, setEntityType] = useState("");
    const [allRoles, setAllRoles] = useState([]);
    const [selectedRole, setSelectedRole] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(function () {
        getAllRoles().then(function (response) {
            console.debug("all roles: ", response);
            setAllRoles(response);
            setSelectedRole(response[0]);
            setIsLoading(false);
        })
    }, [])

    const handleRoleChange = function (event) {
        // var selectedRole = allRoles.filter((role) => { return role.name === event.target.value })
        // setRole(selectedRole[0]);

        setSelectedRole(allRoles.filter((role) => { return role.name === event.target.value })[0]);
    }

    const getView = function () {
        if (isLoading) {
            return <Loading />
        }

        return (
            <>
                <form>
                    <h3>Add new access control</h3>
                    <div className="form-group">
                        <label htmlFor="entity">Entity</label>
                        <input type="text" className="form-control" id="entity" value={entity}
                            placeholder="eg. /page-name" onChange={(event) => setEntity(event.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="entityType">Entity type</label>
                        <input type="text" className="form-control" id="entityType" value={entityType}
                            placeholder="eg. page" onChange={(event) => setEntityType(event.target.value)} />
                    </div>

                    <label htmlFor="roleSelect" className="mt-3">Select Role</label>
                    {/* <select className="form-select" aria-label="Roles" onChange={handleRoleChange} value={selectedRole.name} id={"roleSelect"}>
                        <option value={""}>---Select Role---</option>
                        {allRoles.map((role) => <option value={role.name} key={role.id}>{role.name}</option>)}
                    </select> */}

                    {allRoles.map(function(role){
                        return (
                            <div className="form-check" key={role.id}>
                                <input className="form-check-input" type="checkbox" value="" id={role.id} />
                                <label className="form-check-label" htmlFor={role.id}>
                                    {role.name}
                                </label>
                            </div>
                        )
                    })}

                    {/* <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                            <label className="form-check-label" for="flexCheckDefault">
                                Default checkbox
                            </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked/>
                            <label className="form-check-label" for="flexCheckChecked">
                                Checked checkbox
                            </label>
                    </div> */}
                </form>
            </>
        )
    }

    return (
        <>
            {getView()}
        </>
    )
}