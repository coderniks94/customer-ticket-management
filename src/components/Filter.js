import { useEffect, useState } from "react";

export default function Filter(props) {
    // const [filterValues, setFilterValues] = useState();
    const {filterValues, filterValuesChanged} = props;
    console.debug("Filter props:", props);
    const {filterList} = props;
    console.debug("filterList received: ", filterList);
    console.debug("filterValues: ",filterValues);

    const handleFilterClick = function({filterCategory, filterOption}) {
        console.debug("Setting: ", filterCategory.name, filterOption.name);
        let filterValuesCopy = {...filterValues};
        filterValuesCopy[filterCategory.name][filterOption.name] = !filterValuesCopy[filterCategory.name][filterOption.name];

        // setFilterValues(filterValuesCopy);
        filterValuesChanged(filterValuesCopy);
    }

    return (
        <div className="border me-5 mt-2 pt-3 pb-3 rounded">
            <h4 className="ps-3">Filters</h4>
            <hr class="hr" />
            {filterValues && <div style={{minWidth: "100px"}}>
                {filterList.map((filterCategory) => {
                    return <div key={'filter-category-'+filterCategory.name} className="ps-3">
                        <h5>{filterCategory.label}</h5>
                        {filterCategory.filterOptions.map((filterOption)=>{
                            return <div key={'filter-option-'+filterOption.name} className="ms-3">
                                {console.debug("filterCategory.name, filterOption.name: ",filterCategory.name, filterOption.name)}
                                <input className="form-check-input" type="checkbox" value="" id={'filter-check-'+filterOption.name} 
                                    checked={filterValues[filterCategory.name][filterOption.name]} onChange={()=>handleFilterClick({filterCategory, filterOption})}/>
                                <label className="form-check-label ms-2" htmlFor={'filter-check-'+filterOption.name}>
                                    {filterOption.label}
                                </label>
                            </div>
                        })}
                    </div>
                })}
            </div>}
        </div>
    )
}