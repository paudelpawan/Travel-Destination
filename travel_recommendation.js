const search= document.getElementById("search");
const reset= document.getElementById("reset");
function searchCondition(){
    const keyword= document.getElementById("searchkey").value.toLowerCase();
    const result= document.getElementById("result");
    result.innerHTML="";

fetch('travel_recommendation_api.json')
.then(response => response.json())
.then(data=>{
    let recommendations = [];
    if (keyword === 'beach' || keyword === 'beaches') {
        recommendations = data.beaches;
    } else if (keyword === 'temple' || keyword === 'temples') {
        recommendations = data.temples;
    } else if (keyword === 'country' || keyword === 'countries' || keyword === 'city' || keyword === 'cities') {
        data.countries.forEach(country => {
            recommendations.push(...country.cities);
        });
    }
    if (recommendations.length > 0) {
        recommendations.forEach(item => {
            result.innerHTML += `
                <div class="city-info">
                    <img src="${item.imageUrl}" alt="${item.name}" class="img-style"><br/>
                    <strong>${item.name}</strong>
                    <p>${item.description}</p>
                    <div class="position">Visit</div>
                </div>
                
            `;
        }); 
    }
    else {
        result.innerHTML = "No recommendations found for the given keyword.";
    }
})
.catch(error=>{
    console.log("Couldnot fetch", error);
    result.innerHTML="An error occured while fetching data";
});
}
search.addEventListener('click', searchCondition);
reset.addEventListener('click', () => {
    document.getElementById("searchkey").value = "";
    document.getElementById("result").innerHTML = "";
});