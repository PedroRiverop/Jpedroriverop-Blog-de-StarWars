const getState = ({ getStore, getActions, setStore }) => {
	const BASEURL = "https://www.swapi.tech/api"

	return {
		store: {
		isLoading: false,
		favorites: [],
		characters: [],
		planets: [],
		characterDetails: [],
		filmDetails: [],
		planetDetails: [],
    },
		actions: {
			// Use getActions to call a function within a fuction
			fetchData: async (endpoint) => {
				const store = getStore();
				const localData = localStorage.getItem(endpoint);
		
				
				if (localData) {
				  console.log(`Datos de ${endpoint} cargados desde Local Storage.`);
				  const parsedData = JSON.parse(localData);
				  setStore({ [endpoint]: parsedData });
				  return parsedData;
				}
		
				
				if (!store.isLoading) setStore({ isLoading: true });
		
				try {
				  const response = await fetch(`${BASEURL}/${endpoint}`);
				  if (!response.ok) throw new Error(`Error: ${response.statusText}`);
		
				  const data = await response.json();
				  localStorage.setItem(endpoint, JSON.stringify(data.results || data.result));
				  setStore({ isLoading: false });
				  return data.results || data.result;
				} catch (error) {
				  console.error("Error al cargar datos:", error);
				  setStore({ isLoading: false });
				}
			  },
		
			  loadCharacters: async () => {
				const actions = getActions();
				try {
				  const characterData = await actions.fetchData("people");
				  setStore({ characters: characterData });
				  actions.loadDetails("characters");
				} catch (error) {
				  console.error("Error al cargar personajes:", error);
				}
			  },
		
			  loadPlanets: async () => {
				const actions = getActions();
				try {
				  const planetData = await actions.fetchData("planets");
				  setStore({ planets: planetData });
				  actions.loadDetails("planets");
				} catch (error) {
				  console.error("Error al cargar planetas:", error);
				}
			  },
		
			  loadFilms: async () => {
				const actions = getActions();
				try {
				  const filmData = await actions.fetchData("films");
				  setStore({ filmDetails: filmData });
				} catch (error) {
				  console.error("Error al cargar películas:", error);
				}
			  },
		
			  loadDetails: async (type) => {
				const store = getStore();
				const localDetails = localStorage.getItem(`${type}Details`);
		
				
				if (localDetails) {
				  console.log(`Detalles de ${type} cargados desde Local Storage.`);
				  setStore({ [`${type}Details`]: JSON.parse(localDetails) });
				  return;
				}
		
				
				const resources = store[type === "characters" ? "characters" : type];
				const fetchUrls = resources.map((resource) => resource.url);
		
				
				try {
				  const detailRequests = fetchUrls.map(async (url) => {
					const response = await fetch(url);
					if (!response.ok) throw new Error(`Error: ${response.statusText}`);
					const data = await response.json();
					return data.result;
				  });
		
				  const details = await Promise.all(detailRequests);
				  setStore({ [`${type}Details`]: details });
				  localStorage.setItem(`${type}Details`, JSON.stringify(details));
				} catch (error) {
				  console.error(`Error al cargar detalles de ${type}:`, error);
				}
			  },
		
			  addFavorite: (item) => {
				const store = getStore();
				if (!store.favorites.some((fav) => fav.uid === item.uid)) {
				  setStore({ favorites: [...store.favorites, item] });
				}
			  },
		
			  removeFavorite: (uid, category) => {
				const store = getStore();
				const updatedFavorites = store.favorites.filter(
				  (fav) => fav.uid !== uid || fav.type !== category
				);
				setStore({ favorites: updatedFavorites });
			  },
			},
	};
};

export default getState;
