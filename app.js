const STORAGE_KEY = 'bagepalli-property-listings';
const LANGUAGE_KEY = 'bagepalli-property-language';
const ADMIN_UNLOCK_KEY = 'bagepalli-property-admin-unlocked';
const ADMIN_PASSCODE = '1234';

const translations = {
  en: {
    pageTitle: 'Bagepalli Property Listings',
    siteTitle: 'Bagepalli Properties',
    siteSubtitle: 'Free local land, house, and plot listings',
    languageLabel: 'Language',
    searchLabel: 'Search by place or price',
    searchPlaceholder: 'Example: Bagepalli, Gauribidanur, 500000',
    searchHint: 'Type a village, town, or maximum price.',
    formTitle: 'Add Property',
    titleLabel: 'Title',
    titlePlaceholder: '2 acre land near road',
    descriptionLabel: 'Description',
    descriptionPlaceholder: 'Add size, road access, water, documents, or other details',
    priceLabel: 'Price',
    pricePlaceholder: 'Price in rupees',
    locationLabel: 'Location',
    locationPlaceholder: 'Village or town name',
    contactLabel: 'Contact Number',
    contactPlaceholder: 'Mobile number',
    imageLabel: 'Property Photo',
    submitButton: 'Post Free Listing',
    listingsTitle: 'Property Ads',
    emptyState: 'No listings found.',
    contactPrefix: 'Call',
    publicContactMessage: 'Phone number hidden. Please contact admin to connect buyer and seller.',
    adminTitle: 'Admin Access',
    adminLocked: 'Locked',
    adminUnlocked: 'Unlocked',
    adminCodeLabel: 'Admin passcode',
    adminCodePlaceholder: 'Enter passcode',
    adminLoginButton: 'Unlock',
    adminLogoutButton: 'Lock Admin View',
    adminHint: 'Only admin can see seller phone numbers and share them with genuine buyers.',
    contactPrivacyHint: 'This number is hidden from public users. Only admin can see it.',
    wrongPasscode: 'Wrong passcode. Try again.',
    oneListing: 'listing',
    manyListings: 'listings'
  },
  kn: {
    pageTitle: 'ಬಾಗೇಪಲ್ಲಿ ಆಸ್ತಿ ಜಾಹೀರಾತುಗಳು',
    siteTitle: 'ಬಾಗೇಪಲ್ಲಿ ಆಸ್ತಿಗಳು',
    siteSubtitle: 'ಜಮೀನು, ಮನೆ ಮತ್ತು ಸೈಟ್ ಜಾಹೀರಾತುಗಳು ಉಚಿತ',
    languageLabel: 'ಭಾಷೆ',
    searchLabel: 'ಸ್ಥಳ ಅಥವಾ ಬೆಲೆಯಿಂದ ಹುಡುಕಿ',
    searchPlaceholder: 'ಉದಾಹರಣೆ: ಬಾಗೇಪಲ್ಲಿ, ಗೌರಿಬಿದನೂರು, 500000',
    searchHint: 'ಗ್ರಾಮ, ಪಟ್ಟಣ ಅಥವಾ ಗರಿಷ್ಠ ಬೆಲೆ ಬರೆಯಿರಿ.',
    formTitle: 'ಆಸ್ತಿ ಸೇರಿಸಿ',
    titleLabel: 'ಶೀರ್ಷಿಕೆ',
    titlePlaceholder: 'ರಸ್ತೆ ಹತ್ತಿರ 2 ಎಕರೆ ಜಮೀನು',
    descriptionLabel: 'ವಿವರಣೆ',
    descriptionPlaceholder: 'ಅಳತೆ, ರಸ್ತೆ, ನೀರು, ದಾಖಲೆಗಳು ಅಥವಾ ಬೇರೆ ವಿವರಗಳನ್ನು ಬರೆಯಿರಿ',
    priceLabel: 'ಬೆಲೆ',
    pricePlaceholder: 'ರೂಪಾಯಿಯಲ್ಲಿ ಬೆಲೆ',
    locationLabel: 'ಸ್ಥಳ',
    locationPlaceholder: 'ಗ್ರಾಮ ಅಥವಾ ಪಟ್ಟಣದ ಹೆಸರು',
    contactLabel: 'ಸಂಪರ್ಕ ಸಂಖ್ಯೆ',
    contactPlaceholder: 'ಮೊಬೈಲ್ ಸಂಖ್ಯೆ',
    imageLabel: 'ಆಸ್ತಿ ಫೋಟೋ',
    submitButton: 'ಉಚಿತ ಜಾಹೀರಾತು ಹಾಕಿ',
    listingsTitle: 'ಆಸ್ತಿ ಜಾಹೀರಾತುಗಳು',
    emptyState: 'ಯಾವ ಜಾಹೀರಾತು ಸಿಗಲಿಲ್ಲ.',
    contactPrefix: 'ಕರೆ ಮಾಡಿ',
    publicContactMessage: 'ಫೋನ್ ಸಂಖ್ಯೆ ಮರೆಮಾಡಲಾಗಿದೆ. ಖರೀದಿದಾರ ಮತ್ತು ಮಾರಾಟಗಾರರನ್ನು ಸಂಪರ್ಕಿಸಲು ಆಡ್ಮಿನ್ ಅನ್ನು ಕೇಳಿ.',
    adminTitle: 'ಆಡ್ಮಿನ್ ಪ್ರವೇಶ',
    adminLocked: 'ಲಾಕ್ ಆಗಿದೆ',
    adminUnlocked: 'ತೆರೆದಿದೆ',
    adminCodeLabel: 'ಆಡ್ಮಿನ್ ಪಾಸ್‌ಕೋಡ್',
    adminCodePlaceholder: 'ಪಾಸ್‌ಕೋಡ್ ಬರೆಯಿರಿ',
    adminLoginButton: 'ತೆರೆಯಿರಿ',
    adminLogoutButton: 'ಆಡ್ಮಿನ್ ವೀಕ್ಷಣೆ ಲಾಕ್ ಮಾಡಿ',
    adminHint: 'ಮಾರಾಟಗಾರರ ಫೋನ್ ಸಂಖ್ಯೆಯನ್ನು ಆಡ್ಮಿನ್ ಮಾತ್ರ ನೋಡಿ ನಿಜವಾದ ಖರೀದಿದಾರರಿಗೆ ಹಂಚಬಹುದು.',
    contactPrivacyHint: 'ಈ ಸಂಖ್ಯೆ ಸಾರ್ವಜನಿಕರಿಗೆ ಕಾಣುವುದಿಲ್ಲ. ಆಡ್ಮಿನ್ ಮಾತ್ರ ನೋಡಬಹುದು.',
    wrongPasscode: 'ತಪ್ಪು ಪಾಸ್‌ಕೋಡ್. ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
    oneListing: 'ಜಾಹೀರಾತು',
    manyListings: 'ಜಾಹೀರಾತುಗಳು'
  },
  te: {
    pageTitle: 'బాగేపల్లి ఆస్తి ప్రకటనలు',
    siteTitle: 'బాగేపల్లి ఆస్తులు',
    siteSubtitle: 'భూమి, ఇల్లు మరియు ప్లాట్ ప్రకటనలు ఉచితం',
    languageLabel: 'భాష',
    searchLabel: 'ప్రాంతం లేదా ధరతో వెతకండి',
    searchPlaceholder: 'ఉదాహరణ: బాగేపల్లి, గౌరీబిదనూరు, 500000',
    searchHint: 'గ్రామం, పట్టణం లేదా గరిష్ట ధరను టైప్ చేయండి.',
    formTitle: 'ఆస్తిని జోడించండి',
    titleLabel: 'శీర్షిక',
    titlePlaceholder: 'రోడ్డు దగ్గర 2 ఎకరాల భూమి',
    descriptionLabel: 'వివరణ',
    descriptionPlaceholder: 'పరిమాణం, రోడ్డు, నీరు, పత్రాలు లేదా ఇతర వివరాలు జోడించండి',
    priceLabel: 'ధర',
    pricePlaceholder: 'రూపాయల్లో ధర',
    locationLabel: 'ప్రాంతం',
    locationPlaceholder: 'గ్రామం లేదా పట్టణం పేరు',
    contactLabel: 'సంప్రదింపు నంబర్',
    contactPlaceholder: 'మొబైల్ నంబర్',
    imageLabel: 'ఆస్తి ఫోటో',
    submitButton: 'ఉచిత ప్రకటన పెట్టండి',
    listingsTitle: 'ఆస్తి ప్రకటనలు',
    emptyState: 'ప్రకటనలు కనిపించలేదు.',
    contactPrefix: 'కాల్ చేయండి',
    publicContactMessage: 'ఫోన్ నంబర్ దాచబడింది. కొనుగోలుదారు మరియు అమ్మకందారుని కలపడానికి అడ్మిన్‌ను సంప్రదించండి.',
    adminTitle: 'అడ్మిన్ యాక్సెస్',
    adminLocked: 'లాక్ అయింది',
    adminUnlocked: 'తెరవబడింది',
    adminCodeLabel: 'అడ్మిన్ పాస్‌కోడ్',
    adminCodePlaceholder: 'పాస్‌కోడ్ నమోదు చేయండి',
    adminLoginButton: 'తెరవండి',
    adminLogoutButton: 'అడ్మిన్ వ్యూ లాక్ చేయండి',
    adminHint: 'అమ్మకందారు ఫోన్ నంబర్‌ను అడ్మిన్ మాత్రమే చూసి నిజమైన కొనుగోలుదారులతో పంచగలరు.',
    contactPrivacyHint: 'ఈ నంబర్ ప్రజలకు కనిపించదు. అడ్మిన్ మాత్రమే చూడగలరు.',
    wrongPasscode: 'తప్పు పాస్‌కోడ్. మళ్లీ ప్రయత్నించండి.',
    oneListing: 'ప్రకటన',
    manyListings: 'ప్రకటనలు'
  }
};

const starterListingText = {
  1: {
    en: {
      title: 'Agricultural land near Bagepalli',
      description: 'Good road access and open land suitable for farming.',
      location: 'Bagepalli'
    },
    kn: {
      title: 'ಬಾಗೇಪಳ್ಳಿ ಹತ್ತಿರ ಕೃಷಿ ಜಮೀನು',
      description: 'ರಸ್ತೆ ಸೌಲಭ್ಯ ಇದೆ, ಕೃಷಿಗೆ ಸೂಕ್ತವಾದ ತೆರೆಯಾದ ಜಮೀನು.',
      location: 'ಬಾಗೇಪಳ್ಳಿ'
    },
    te: {
      title: 'బాగేపల్లి దగ్గర వ్యవసాయ భూమి',
      description: 'రోడ్డు సౌకర్యం ఉంది, వ్యవసాయానికి అనుకూలమైన ఖాళీ భూమి.',
      location: 'బాగేపల్లి'
    }
  },
  2: {
    en: {
      title: 'House plot close to main road',
      description: 'Clear layout plot with nearby water and transport.',
      location: 'Chilakalanerpu'
    },
    kn: {
      title: 'ಮುಖ್ಯ ರಸ್ತೆಯ ಹತ್ತಿರ ಮನೆ ಸೈಟ್',
      description: 'ನೀರು ಮತ್ತು ಸಾರಿಗೆ ಹತ್ತಿರ ಇರುವ ಸ್ಪಷ್ಟ ಲೇಔಟ್ ಸೈಟ್.',
      location: 'ಚಿಲಕಲನೇರ್ಪು'
    },
    te: {
      title: 'ప్రధాన రోడ్డుకు దగ్గరగా ఇల్లు ప్లాట్',
      description: 'నీరు మరియు రవాణా దగ్గరలో ఉన్న క్లియర్ లేఅవుట్ ప్లాట్.',
      location: 'చిలకలనేర్పు'
    }
  },
  3: {
    en: {
      title: 'Small village house for sale',
      description: 'Simple home with space for parking and cattle shed.',
      location: 'Gauribidanur Road'
    },
    kn: {
      title: 'ಮಾರಾಟಕ್ಕೆ ಸಣ್ಣ ಗ್ರಾಮ ಮನೆ',
      description: 'ಪಾರ್ಕಿಂಗ್ ಮತ್ತು ಪಶು ಶೆಡ್ ಜಾಗ ಇರುವ ಸರಳ ಮನೆ.',
      location: 'ಗೌರಿಬಿದನೂರು ರಸ್ತೆ'
    },
    te: {
      title: 'అమ్మకానికి చిన్న గ్రామ ఇల్లు',
      description: 'పార్కింగ్ మరియు పశువుల షెడ్ కోసం స్థలం ఉన్న సాధారణ ఇల్లు.',
      location: 'గౌరీబిదనూరు రోడ్'
    }
  }
};

const defaultImage = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 420">
  <rect width="640" height="420" fill="#e8ece5"/>
  <path d="M90 310h460v50H90z" fill="#b6c7b7"/>
  <path d="M130 275h170V140l-85-70-85 70z" fill="#13734b"/>
  <path d="M315 285h195V165l-98-82-97 82z" fill="#f3b33d"/>
  <rect x="185" y="210" width="50" height="85" fill="#ffffff"/>
  <rect x="370" y="215" width="70" height="55" fill="#ffffff"/>
  <path d="M80 335c80-28 170-28 270 0 70 20 145 17 225-8v93H80z" fill="#cfd9cb"/>
</svg>`);

const starterListings = [
  {
    id: 1,
    title: 'Agricultural land near Bagepalli',
    description: 'Good road access and open land suitable for farming.',
    price: 850000,
    location: 'Bagepalli',
    contact: '9876543210',
    image: defaultImage
  },
  {
    id: 2,
    title: 'House plot close to main road',
    description: 'Clear layout plot with nearby water and transport.',
    price: 420000,
    location: 'Chilakalanerpu',
    contact: '9123456780',
    image: defaultImage
  },
  {
    id: 3,
    title: 'Small village house for sale',
    description: 'Simple home with space for parking and cattle shed.',
    price: 650000,
    location: 'Gauribidanur Road',
    contact: '9988776655',
    image: defaultImage
  }
];

const form = document.getElementById('listingForm');
const languageSelect = document.getElementById('languageSelect');
const adminCode = document.getElementById('adminCode');
const adminLogin = document.getElementById('adminLogin');
const adminLoginButton = document.getElementById('adminLoginButton');
const adminLogoutButton = document.getElementById('adminLogoutButton');
const adminStatus = document.getElementById('adminStatus');
const searchInput = document.getElementById('searchInput');
const listingsGrid = document.getElementById('listingsGrid');
const listingCount = document.getElementById('listingCount');
const emptyState = document.getElementById('emptyState');

let listings = loadListings();
let currentLanguage = localStorage.getItem(LANGUAGE_KEY) || 'en';
let isAdminUnlocked = localStorage.getItem(ADMIN_UNLOCK_KEY) === 'true';

languageSelect.value = currentLanguage;
applyLanguage();
updateAdminView();
renderListings(listings);

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const imageFile = formData.get('image');
  const image = imageFile && imageFile.size > 0 ? await readImage(imageFile) : defaultImage;

  const listing = {
    id: Date.now(),
    title: formData.get('title').trim(),
    description: formData.get('description').trim(),
    price: Number(formData.get('price')),
    location: formData.get('location').trim(),
    contact: formData.get('contact').trim(),
    image
  };

  listings = [listing, ...listings];
  saveListings();
  form.reset();
  searchInput.value = '';
  renderListings(listings);
});

languageSelect.addEventListener('change', () => {
  currentLanguage = languageSelect.value;
  localStorage.setItem(LANGUAGE_KEY, currentLanguage);
  applyLanguage();
  updateAdminView();
  renderListings(filterListings(searchInput.value.trim().toLowerCase()));
});

adminLoginButton.addEventListener('click', unlockAdmin);

adminCode.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    unlockAdmin();
  }
});

adminLogoutButton.addEventListener('click', () => {
  isAdminUnlocked = false;
  localStorage.removeItem(ADMIN_UNLOCK_KEY);
  updateAdminView();
  renderListings(filterListings(searchInput.value.trim().toLowerCase()));
});

searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value.trim().toLowerCase();
  renderListings(filterListings(searchTerm));
});

function loadListings() {
  const savedListings = localStorage.getItem(STORAGE_KEY);

  if (!savedListings) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(starterListings));
    return starterListings;
  }

  try {
    return JSON.parse(savedListings);
  } catch {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(starterListings));
    return starterListings;
  }
}

function saveListings() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(listings));
}

function filterListings(searchTerm) {
  if (!searchTerm) {
    return listings;
  }

  const priceSearch = Number(searchTerm.replace(/[^0-9]/g, ''));

  return listings.filter((listing) => {
    const displayListing = getDisplayListing(listing);
    const textMatch = `${displayListing.title} ${displayListing.location}`.toLowerCase().includes(searchTerm);
    const priceMatch = priceSearch > 0 && Number(listing.price) <= priceSearch;
    return textMatch || priceMatch;
  });
}

function renderListings(items) {
  const text = translations[currentLanguage];
  listingsGrid.innerHTML = '';
  listingCount.textContent = `${items.length} ${items.length === 1 ? text.oneListing : text.manyListings}`;
  emptyState.hidden = items.length > 0;

  items.forEach((listing) => {
    const displayListing = getDisplayListing(listing);
    const card = document.createElement('article');
    card.className = 'listing-card';

    card.innerHTML = `
      <img src="${displayListing.image || defaultImage}" alt="${escapeHtml(displayListing.title)}">
      <div class="listing-body">
        <h3>${escapeHtml(displayListing.title)}</h3>
        <p class="price">${formatPrice(displayListing.price)}</p>
        <p class="location">${escapeHtml(displayListing.location)}</p>
        <p class="description">${escapeHtml(displayListing.description)}</p>
        ${renderContact(displayListing, text)}
      </div>
    `;

    listingsGrid.appendChild(card);
  });
}

function renderContact(listing, text) {
  if (!isAdminUnlocked) {
    return `<p class="private-contact">${escapeHtml(text.publicContactMessage)}</p>`;
  }

  return `<p class="contact">${text.contactPrefix}: <a href="tel:${escapeHtml(listing.contact)}">${escapeHtml(listing.contact)}</a></p>`;
}

function unlockAdmin() {
  const text = translations[currentLanguage];

  if (adminCode.value.trim() !== ADMIN_PASSCODE) {
    alert(text.wrongPasscode);
    adminCode.value = '';
    adminCode.focus();
    return;
  }

  isAdminUnlocked = true;
  localStorage.setItem(ADMIN_UNLOCK_KEY, 'true');
  adminCode.value = '';
  updateAdminView();
  renderListings(filterListings(searchInput.value.trim().toLowerCase()));
}

function updateAdminView() {
  const text = translations[currentLanguage];
  adminStatus.textContent = isAdminUnlocked ? text.adminUnlocked : text.adminLocked;
  adminLogin.hidden = isAdminUnlocked;
  adminLogoutButton.hidden = !isAdminUnlocked;
}

function applyLanguage() {
  const text = translations[currentLanguage];
  document.documentElement.lang = currentLanguage;
  document.title = text.pageTitle;

  document.querySelectorAll('[data-i18n]').forEach((element) => {
    element.textContent = text[element.dataset.i18n];
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => {
    element.placeholder = text[element.dataset.i18nPlaceholder];
  });
}

function getDisplayListing(listing) {
  const translatedStarter = starterListingText[listing.id]?.[currentLanguage];

  if (!translatedStarter) {
    return listing;
  }

  return {
    ...listing,
    ...translatedStarter
  };
}

function readImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function formatPrice(price) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(price);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
