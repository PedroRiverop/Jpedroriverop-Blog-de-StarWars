const getState = ({ getStore, getActions, setStore }) => {
	const BASEURL = "https://www.swapi.tech/api"

	return {
		store: {
		isLoading: false,
		favorites: [],
		people: [],
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
				  actions.loadDetails("people");
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
		
			  loadDetails: async (storeInfo) => {
				const store = getStore();
				const storage = window.localStorage;
			  
				// Verificar si los detalles ya están en localStorage
				const localDetails = storage.getItem(`${storeInfo}Details`);
				if (localDetails) {
				  console.log(`Detalles de ${storeInfo} cargados desde Local Storage.`);
				  setStore({ [`${storeInfo}Details`]: JSON.parse(localDetails) });
				  return;
				}
			  
				// Obtener los recursos desde el estado
				const resourceKey = storeInfo === "people" ? "people" : storeInfo;
				const resources = store[resourceKey];
			  
				// Validar que existan recursos
				if (!resources || !Array.isArray(resources)) {
				  console.error(`No hay recursos disponibles para ${storeInfo}.`);
				  return;
				}
			  
				// Construir las promesas para obtener detalles
				try {
				  const detailPromises = resources.map(async (item) => {
					try {
					  const response = await fetch(item.url);
					  if (!response.ok) throw new Error(`Error: ${response.statusText}`);
					  const data = await response.json();
					  return data.result;
					} catch (error) {
					  console.error(`Error al obtener detalles de ${storeInfo}:`, error);
					}
				  });
			  
				  // Resolver todas las promesas
				  const resolvedDetails = (await Promise.all(detailPromises)).filter(Boolean);
			  
				  // Actualizar el estado y guardar en localStorage
				  setStore({ [`${storeInfo}Details`]: resolvedDetails });
				  storage.setItem(`${storeInfo}Details`, JSON.stringify(resolvedDetails));
				} catch (error) {
				  console.error(`Error al cargar detalles de ${storeInfo}:`, error);
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
