import React from "react"
import { Link, useSearchParams } from "react-router-dom"
import Card from "../../components/Card"
import { getVans } from "../../../api"
import { useLanguage } from "../../contexts/LanguageContext"

export default function Vans() {
    const [vans, setVans] = React.useState([])
    const [searchParams, setSearchParams] = useSearchParams()
    const typeFilter = searchParams.get("type")
    const priceFilter = searchParams.get("price")
    const searchQuery = searchParams.get("search") || ""
    const [searchInput, setSearchInput] = React.useState(searchQuery)
    const { t } = useLanguage()

    function handleFilter(type) {
        if (type) {
            // Preserve other filters if they exist
            const updatedParams = { type };
            if (priceFilter) {
                updatedParams.price = priceFilter;
            }
            if (searchQuery) {
                updatedParams.search = searchQuery;
            }
            setSearchParams(updatedParams);
        } else {
            // If clearing type filter but other filters exist
            const updatedParams = {};
            if (priceFilter) {
                updatedParams.price = priceFilter;
            }
            if (searchQuery) {
                updatedParams.search = searchQuery;
            }
            
            if (Object.keys(updatedParams).length > 0) {
                setSearchParams(updatedParams);
            } else {
                setSearchParams({});
            }
        }
    }

    function handlePriceFilter(priceRange) {
        const updatedParams = {};
        if (priceRange) {
            updatedParams.price = priceRange;
        }
        if (typeFilter) {
            updatedParams.type = typeFilter;
        }
        if (searchQuery) {
            updatedParams.search = searchQuery;
        }
        setSearchParams(updatedParams);
    }

    function handleSearch(e) {
        e.preventDefault();
        const updatedParams = {};
        
        if (searchInput.trim()) {
            updatedParams.search = searchInput.trim();
        }
        if (typeFilter) {
            updatedParams.type = typeFilter;
        }
        if (priceFilter) {
            updatedParams.price = priceFilter;
        }
        
        setSearchParams(updatedParams);
    }

    function handleSearchInputChange(e) {
        setSearchInput(e.target.value);
    }

    function clearSearch() {
        setSearchInput("");
        const updatedParams = {};
        if (typeFilter) {
            updatedParams.type = typeFilter;
        }
        if (priceFilter) {
            updatedParams.price = priceFilter;
        }
        setSearchParams(updatedParams);
    }

    React.useEffect(() => {
        async function loadVans() {
            const data = await getVans()
            setVans(data)
        }
        
        loadVans()
    }, [])
    
    // Filter vans based on type, price and search query
    const filteredVans = vans.filter((van) => {
        // Type filter
        const matchesType = !typeFilter || van.type === typeFilter;
        
        // Price filter
        let matchesPrice = true;
        if (priceFilter) {
            const price = Number(van.price);
            switch(priceFilter) {
                case "low":
                    matchesPrice = price < 80;
                    break;
                case "medium":
                    matchesPrice = price >= 80 && price <= 120;
                    break;
                case "high":
                    matchesPrice = price > 120;
                    break;
                default:
                    matchesPrice = true;
            }
        }
        
        // Name search filter
        const matchesSearch = !searchQuery || 
            van.name.toLowerCase().includes(searchQuery.toLowerCase());
        
        return matchesType && matchesPrice && matchesSearch;
    });

    const vanElements = filteredVans.map(van => (
        <Card key={van.id} id={van.id} img={van.imageUrl} title={van.name} price={van.price} type={van.type}/>
    ))

    return (
        <div className="van-list-container">
            <h1>{t.exploreOptions}</h1>
            
            {/* Search bar */}
            <div className="search-container">
                <form onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder={t.searchByName}
                        value={searchInput}
                        onChange={handleSearchInputChange}
                        className="search-input"
                    />
                    <button type="submit" className="search-button">{t.search}</button>
                    {searchQuery && 
                        <button 
                            type="button" 
                            className="clear-search-button" 
                            onClick={clearSearch}
                        >
                            {t.clear}
                        </button>
                    }
                </form>
            </div>
            
            <div className="filters-container">
                <div className="filter-group">
                    <h3>{t.filterByType}</h3>
                    <div className="button-group">
                        <button 
                            className={`filter-btn ${typeFilter === "simple" ? "selected" : ""}`}
                            onClick={() => handleFilter("simple")}
                        >
                            {t.simple}
                        </button>
                        <button 
                            className={`filter-btn ${typeFilter === "luxury" ? "selected" : ""}`}
                            onClick={() => handleFilter("luxury")}
                        >
                            {t.luxury}
                        </button>
                        <button 
                            className={`filter-btn ${typeFilter === "rugged" ? "selected" : ""}`}
                            onClick={() => handleFilter("rugged")}
                        >
                            {t.rugged}
                        </button>
                    </div>
                </div>
                
                <div className="filter-group">
                    <h3>{t.filterByPrice}</h3>
                    <div className="button-group">
                        <button 
                            className={`filter-btn ${priceFilter === "low" ? "selected" : ""}`}
                            onClick={() => handlePriceFilter("low")}
                        >
                            $0-79
                        </button>
                        <button 
                            className={`filter-btn ${priceFilter === "medium" ? "selected" : ""}`}
                            onClick={() => handlePriceFilter("medium")}
                        >
                            $80-120
                        </button>
                        <button 
                            className={`filter-btn ${priceFilter === "high" ? "selected" : ""}`}
                            onClick={() => handlePriceFilter("high")}
                        >
                            $120+
                        </button>
                    </div>
                </div>
                
                {(typeFilter || priceFilter || searchQuery) && 
                    <button 
                        className="clear-filters-button" 
                        onClick={() => {
                            setSearchParams({});
                            setSearchInput("");
                        }}
                    >
                        {t.clearFilters}
                    </button>
                }
            </div>
            
            <div className="van-list">
                {vanElements.length > 0 ? 
                    vanElements : 
                    <p className="no-results">{t.noResults}</p>
                }
            </div>
        </div>
    )
}