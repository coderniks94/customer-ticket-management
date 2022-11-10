import { useEffect, useState } from "react";

export default function Filter(props) {
    // const [filterValues, setFilterValues] = useState();
    const {filterValues, filterValuesChanged} = props;
    console.debug("Filter props:", props);
    const {filterList} = props;
    console.debug("filterList received: ", filterList);

    // useEffect(() => {
    //     let filterValuesCopy = { ...filterValues };
    //     filterList.forEach((category) => {
    //         filterValuesCopy[category.name] = {};
    //         category.filterOptions.forEach((option) => {
    //             filterValuesCopy[category.name][option.name] = false;
    //         })
    //     })
    //     setFilterValues(filterValuesCopy);
    // }, [])

    
    // for(var category in filterList) {
    //     filterValues[filterList[category].categoryName] = {};
    //     for(var option in category.filterOptions) {
    //         filterValues[category.categoryName][option.name] = false;
    //     }
    // }
    console.debug("filterValues: ",filterValues);

    const handleFilterClick = function({filterCategory, filterOption}) {
        console.debug("Setting: ", filterCategory.name, filterOption.name);
        let filterValuesCopy = {...filterValues};
        filterValuesCopy[filterCategory.name][filterOption.name] = !filterValuesCopy[filterCategory.name][filterOption.name];

        // setFilterValues(filterValuesCopy);
        filterValuesChanged(filterValuesCopy);
    }

    return (
        filterValues && <div style={{minWidth: "100px"}}>
            {filterList.map((filterCategory) => {
                return <div key={'filter-category-'+filterCategory.name}>
                    <h5>{filterCategory.label}</h5>
                    {filterCategory.filterOptions.map((filterOption)=>{
                        return <div key={'filter-option-'+filterOption.name}>
                            {console.debug("filterCategory.name, filterOption.name: ",filterCategory.name, filterOption.name)}
                            <input className="form-check-input" type="checkbox" value="" id={'filter-check-'+filterOption.name} 
                                checked={filterValues[filterCategory.name][filterOption.name]} onChange={()=>handleFilterClick({filterCategory, filterOption})}/>
                            <label className="form-check-label" htmlFor={'filter-check-'+filterOption.name}>
                                {filterOption.label}
                            </label>
                        </div>
                    })}
                </div>
            })}
        </div>
    )
}