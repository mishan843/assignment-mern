import React, { useEffect, useState } from 'react'
import Banner from '../components/Banner'
import Sidebar from '../sidebar/Sidebar'
import Card from '../components/Card';
import Recipes from '../components/Recipes';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    setIsLoading(true);
    fetch("https://api.spoonacular.com/recipes/complexSearch?apiKey=109372c243a54659902b861f188df5db", {
      method: "GET",
      headers: {"content-type": "application/json"}
    })
      .then((res) => res.json())
      .then((data) => setRecipes(data.results));
    setIsLoading(false);
  }, []);

  const [query, setQuery] = useState("");
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const filterdItems = recipes.filter(
    (recipe) => recipe.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );

  const handleChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleClick = (e) => {
    setSelectedCategory(e.target.value);
  };

  const calculatePageRange = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return { startIndex, endIndex };
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(filterdItems.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  const filteredData = (recipes) => {
    let filteredRecipes = recipes;
    const { startIndex, endIndex } = calculatePageRange();
    filteredRecipes = filteredRecipes.slice(startIndex, endIndex);
    return filteredRecipes.map((data, i) => <Card data={data} key={i} />);
  };

  const result = filteredData(recipes, query);


  return (
    <div>
      <Banner value={query} handleInputChange={handleInputChange}/>
      <div className="bg-[#fafafa] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12">
        {/* // left side */}
        <div className="bg-white px-4 rounded">
          <Sidebar handleChange={handleChange} handleClick={handleClick} />
        </div>
        {/* //jobs card */}
        <div className="col-span-2 bg-white p-4 rounded-sm">
          {isLoading ? (
            <p className="font-medium">Loading...</p>
          ) : result.length > 0 ? (
            <Recipes result={result} />
          ) : (
            <>
              <h3 className="text-lg font-bold mb-2">{filterdItems.length} Recipes</h3>
              <p>Not Found!</p>
            </>
          )}

          {result.length > 0 ? (
            <div className="flex justify-center mt-4 space-x-8">
              <button
                className="hover:underline"
                onClick={prevPage}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="mx-2">
                Page {currentPage} of
                {Math.ceil(filterdItems.length / itemsPerPage)}
              </span>
              <button
                className="hover:underline"
                onClick={nextPage}
                disabled={
                  currentPage === Math.ceil(filterdItems.length / itemsPerPage)
                }
              >
                Next
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
        {/* // right side */}
        {/* <div className="bg-white px-4 rounded">right</div> */}
      </div>
    </div>
  )
}

export default Home;
