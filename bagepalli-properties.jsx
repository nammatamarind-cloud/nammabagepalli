import { useState, useEffect, useRef, useCallback } from "react";

// ═══════════════════════════════════════════════════════════════
//  TRANSLATIONS
// ═══════════════════════════════════════════════════════════════
const T = {
  en: {
    siteTitle:"Bagepalli Properties", siteSubtitle:"Free land, house & plot listings for everyone",
    langLabel:"Language",
    // nav
    navListings:"Listings", navPost:"Post Ad", navInbox:"My Inbox", navLogin:"Login / Register",
    // user login
    userLoginTitle:"Login / Register", userLoginSub:"Enter your mobile number to login or create an account.",
    mobileLabel:"Mobile Number", mobilePh:"10-digit mobile number",
    nameLabel:"Your Name", namePh:"Full name",
    loginBtn:"Continue", logoutBtn:"Logout",
    welcomeBack:"Welcome back,", newUser:"New account created for",
    // search
    searchLabel:"Search by village, town or max price", searchPlaceholder:"Bagepalli, Gauribidanur, 500000…",
    searchHint:"Type a village name or a maximum price in rupees.",
    // post
    postTitle:"Post a Free Listing",
    fTitle:"Title *", fTitlePh:"2 acre farm near main road",
    fDesc:"Description", fDescPh:"Size, road access, water, documents…",
    fPrice:"Price (₹) *", fPricePh:"Price in rupees",
    fLoc:"Location *", fLocPh:"Village or town name",
    fContact:"Your Mobile Number *", fContactPh:"10-digit mobile number",
    fContactHint:"Hidden from public. Only admin can see it.",
    fPhoto:"Property Photo (optional)",
    fGps:"Capture GPS Location", fGpsOk:"✅ GPS captured", fGpsErr:"Could not get GPS", fGpsWait:"Getting GPS…",
    fSubmit:"Post Free Listing", fPosted:"✅ Listing posted!",
    loginToPost:"Please login first to post a listing.",
    // listings
    listingsTitle:"All Listings", noListings:"No listings found.",
    filterAll:"All", filterLand:"Land", filterHouse:"House", filterPlot:"Plot", filterSold:"Sold",
    typeLabel:"Type", loading:"Loading listings…", syncErr:"Could not sync. Showing local data.",
    // sold
    markSold:"Mark as Sold", markAvailable:"Mark as Available",
    soldBadge:"SOLD", soldOn:"Sold on:",
    onlyYourListing:"You can only mark your own listings.",
    // contact
    contactHidden:"📞 Contact hidden — ask admin to connect you.",
    contactCall:"📞 Call:",
    // actions
    waShare:"WhatsApp", qrBtn:"QR Code", deleteBtn:"Delete",
    nCount:(n)=>`${n} listing${n===1?"":"s"}`,
    // admin
    adminTitle:"Admin Access", adminHint:"Admin sees contacts, GPS, messages users & manages listings.",
    adminLocked:"🔒 Locked", adminUnlocked:"🔓 Unlocked",
    adminCodePh:"Enter passcode", adminUnlock:"Unlock", adminLock:"Lock",
    adminWrong:"Wrong passcode.",
    changePwdTitle:"Change Password",
    cpCurrent:"Current", cpNew:"New", cpConfirm:"Confirm",
    cpBtn:"Update", cpOk:"✅ Password updated!", cpMismatch:"New passwords don't match.", cpWrong:"Current password wrong.",
    // inbox (admin sends to user)
    inboxTitle:"My Inbox", inboxEmpty:"No messages yet.",
    inboxFrom:"From Admin", inboxRead:"Mark read",
    unread:"unread",
    // admin messaging
    adminUsersTitle:"Registered Users",
    adminMsgTitle:"Send Message to User",
    adminMsgPh:"Type your message to this user…",
    adminMsgSend:"Send Message",
    adminMsgSent:"✅ Message sent!",
    adminMsgLabel:"Message",
    noUsers:"No registered users yet.",
    gpsLabel:"GPS",
  },
  kn: {
    siteTitle:"ಬಾಗೇಪಲ್ಲಿ ಆಸ್ತಿಗಳು", siteSubtitle:"ಎಲ್ಲರಿಗೂ ಉಚಿತ ಜಮೀನು, ಮನೆ ಮತ್ತು ಸೈಟ್ ಜಾಹೀರಾತುಗಳು",
    langLabel:"ಭಾಷೆ",
    navListings:"ಜಾಹೀರಾತುಗಳು", navPost:"ಜಾಹೀರಾತು ಹಾಕಿ", navInbox:"ನನ್ನ ಸಂದೇಶಗಳು", navLogin:"ಲಾಗಿನ್",
    userLoginTitle:"ಲಾಗಿನ್ / ನೋಂದಣಿ", userLoginSub:"ಲಾಗಿನ್ ಅಥವಾ ಖಾತೆ ತೆರೆಯಲು ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ.",
    mobileLabel:"ಮೊಬೈಲ್ ಸಂಖ್ಯೆ", mobilePh:"10 ಅಂಕಿ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ",
    nameLabel:"ನಿಮ್ಮ ಹೆಸರು", namePh:"ಪೂರ್ಣ ಹೆಸರು",
    loginBtn:"ಮುಂದುವರೆಯಿರಿ", logoutBtn:"ಲಾಗ್ ಔಟ್",
    welcomeBack:"ಸ್ವಾಗತ,", newUser:"ಹೊಸ ಖಾತೆ ತೆರೆಯಲಾಗಿದೆ",
    searchLabel:"ಗ್ರಾಮ, ಪಟ್ಟಣ ಅಥವಾ ಗರಿಷ್ಠ ಬೆಲೆಯಿಂದ ಹುಡುಕಿ", searchPlaceholder:"ಬಾಗೇಪಲ್ಲಿ, ಗೌರಿಬಿದನೂರು, 500000…",
    searchHint:"ಗ್ರಾಮ ಅಥವಾ ಗರಿಷ್ಠ ಬೆಲೆ ಬರೆಯಿರಿ.",
    postTitle:"ಉಚಿತ ಜಾಹೀರಾತು ಹಾಕಿ",
    fTitle:"ಶೀರ್ಷಿಕೆ *", fTitlePh:"ರಸ್ತೆ ಹತ್ತಿರ 2 ಎಕರೆ ಜಮೀನು",
    fDesc:"ವಿವರಣೆ", fDescPh:"ಅಳತೆ, ರಸ್ತೆ, ನೀರು, ದಾಖಲೆಗಳು…",
    fPrice:"ಬೆಲೆ (₹) *", fPricePh:"ರೂಪಾಯಿಯಲ್ಲಿ ಬೆಲೆ",
    fLoc:"ಸ್ಥಳ *", fLocPh:"ಗ್ರಾಮ ಅಥವಾ ಪಟ್ಟಣದ ಹೆಸರು",
    fContact:"ನಿಮ್ಮ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ *", fContactPh:"10 ಅಂಕಿ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ",
    fContactHint:"ಸಾರ್ವಜನಿಕರಿಗೆ ಮರೆಮಾಡಲಾಗಿದೆ.",
    fPhoto:"ಆಸ್ತಿ ಫೋಟೋ (ಐಚ್ಛಿಕ)",
    fGps:"GPS ಸ್ಥಳ ತೆಗೆದುಕೊಳ್ಳಿ", fGpsOk:"✅ GPS ದಾಖಲಾಗಿದೆ", fGpsErr:"ಸ್ಥಳ ಸಿಗಲಿಲ್ಲ", fGpsWait:"GPS ತೆಗೆಯುತ್ತಿದೆ…",
    fSubmit:"ಉಚಿತ ಜಾಹೀರಾತು ಹಾಕಿ", fPosted:"✅ ಜಾಹೀರಾತು ಹಾಕಲಾಗಿದೆ!",
    loginToPost:"ಜಾಹೀರಾತು ಹಾಕಲು ಮೊದಲು ಲಾಗಿನ್ ಮಾಡಿ.",
    listingsTitle:"ಎಲ್ಲಾ ಜಾಹೀರಾತುಗಳು", noListings:"ಯಾವ ಜಾಹೀರಾತು ಸಿಗಲಿಲ್ಲ.",
    filterAll:"ಎಲ್ಲಾ", filterLand:"ಜಮೀನು", filterHouse:"ಮನೆ", filterPlot:"ಸೈಟ್", filterSold:"ಮಾರಾಟ",
    typeLabel:"ವಿಧ", loading:"ಲೋಡ್ ಆಗುತ್ತಿದೆ…", syncErr:"ಸಿಂಕ್ ಆಗಲಿಲ್ಲ.",
    markSold:"ಮಾರಾಟ ಆಯಿತು", markAvailable:"ಲಭ್ಯ ಇದೆ",
    soldBadge:"ಮಾರಾಟ", soldOn:"ಮಾರಾಟ ದಿನಾಂಕ:",
    onlyYourListing:"ನಿಮ್ಮ ಜಾಹೀರಾತು ಮಾತ್ರ ಬದಲಾಯಿಸಬಹುದು.",
    contactHidden:"📞 ಸಂಪರ್ಕ ಮರೆಮಾಡಲಾಗಿದೆ — ಆಡ್ಮಿನ್ ಅನ್ನು ಕೇಳಿ.",
    contactCall:"📞 ಕರೆ ಮಾಡಿ:",
    waShare:"WhatsApp", qrBtn:"QR ಕೋಡ್", deleteBtn:"ಅಳಿಸಿ",
    nCount:(n)=>`${n} ಜಾಹೀರಾತು${n===1?"":"ಗಳು"}`,
    adminTitle:"ಆಡ್ಮಿನ್ ಪ್ರವೇಶ", adminHint:"ಆಡ್ಮಿನ್ ಸಂಖ್ಯೆ, GPS, ಸಂದೇಶ ಮತ್ತು ಜಾಹೀರಾತು ನಿರ್ವಹಿಸಬಹುದು.",
    adminLocked:"🔒 ಲಾಕ್", adminUnlocked:"🔓 ತೆರೆದಿದೆ",
    adminCodePh:"ಪಾಸ್‌ಕೋಡ್ ಬರೆಯಿರಿ", adminUnlock:"ತೆರೆಯಿರಿ", adminLock:"ಲಾಕ್",
    adminWrong:"ತಪ್ಪು ಪಾಸ್‌ಕೋಡ್.",
    changePwdTitle:"ಪಾಸ್‌ವರ್ಡ್ ಬದಲಾಯಿಸಿ",
    cpCurrent:"ಪ್ರಸ್ತುತ", cpNew:"ಹೊಸ", cpConfirm:"ದೃಢೀಕರಿಸಿ",
    cpBtn:"ನವೀಕರಿಸಿ", cpOk:"✅ ಪಾಸ್‌ವರ್ಡ್ ನವೀಕರಿಸಲಾಗಿದೆ!", cpMismatch:"ಹೊಂದುತ್ತಿಲ್ಲ.", cpWrong:"ತಪ್ಪು ಪಾಸ್‌ವರ್ಡ್.",
    inboxTitle:"ನನ್ನ ಸಂದೇಶಗಳು", inboxEmpty:"ಯಾವ ಸಂದೇಶ ಇಲ್ಲ.", inboxFrom:"ಆಡ್ಮಿನ್ ಕಡೆಯಿಂದ", inboxRead:"ಓದಿದ್ದಾಯಿತು", unread:"ಓದಿಲ್ಲ",
    adminUsersTitle:"ನೋಂದಾಯಿತ ಬಳಕೆದಾರರು", adminMsgTitle:"ಬಳಕೆದಾರರಿಗೆ ಸಂದೇಶ ಕಳುಹಿಸಿ",
    adminMsgPh:"ಸಂದೇಶ ಬರೆಯಿರಿ…", adminMsgSend:"ಕಳುಹಿಸಿ", adminMsgSent:"✅ ಕಳುಹಿಸಲಾಗಿದೆ!", adminMsgLabel:"ಸಂದೇಶ",
    noUsers:"ಇನ್ನೂ ಯಾರೂ ನೋಂದಾಯಿಸಿಲ್ಲ.", gpsLabel:"GPS",
  },
  te: {
    siteTitle:"బాగేపల్లి ఆస్తులు", siteSubtitle:"అందరికీ ఉచిత భూమి, ఇల్లు మరియు ప్లాట్ ప్రకటనలు",
    langLabel:"భాష",
    navListings:"ప్రకటనలు", navPost:"ప్రకటన పెట్టు", navInbox:"నా సందేశాలు", navLogin:"లాగిన్",
    userLoginTitle:"లాగిన్ / నమోదు", userLoginSub:"లాగిన్ లేదా ఖాతా తెరవడానికి మీ మొబైల్ నంబర్ నమోదు చేయండి.",
    mobileLabel:"మొబైల్ నంబర్", mobilePh:"10-అంకెల మొబైల్ నంబర్",
    nameLabel:"మీ పేరు", namePh:"పూర్తి పేరు",
    loginBtn:"కొనసాగించు", logoutBtn:"లాగ్ అవుట్",
    welcomeBack:"స్వాగతం,", newUser:"కొత్త ఖాతా తెరవబడింది",
    searchLabel:"గ్రామం, పట్టణం లేదా గరిష్ట ధరతో వెతకండి", searchPlaceholder:"బాగేపల్లి, గౌరీబిదనూరు, 500000…",
    searchHint:"గ్రామం పేరు లేదా గరిష్ట ధర టైప్ చేయండి.",
    postTitle:"ఉచిత ప్రకటన పెట్టండి",
    fTitle:"శీర్షిక *", fTitlePh:"రోడ్డు దగ్గర 2 ఎకరాల భూమి",
    fDesc:"వివరణ", fDescPh:"పరిమాణం, రోడ్డు, నీరు, పత్రాలు…",
    fPrice:"ధర (₹) *", fPricePh:"రూపాయల్లో ధర",
    fLoc:"ప్రాంతం *", fLocPh:"గ్రామం లేదా పట్టణం పేరు",
    fContact:"మీ మొబైల్ నంబర్ *", fContactPh:"10-అంకెల మొబైల్ నంబర్",
    fContactHint:"ప్రజలకు కనిపించదు.",
    fPhoto:"ఆస్తి ఫోటో (ఐచ్ఛికం)",
    fGps:"GPS స్థానం తీసుకోండి", fGpsOk:"✅ GPS నమోదైంది", fGpsErr:"స్థానం లభించలేదు", fGpsWait:"GPS తీసుకుంటున్నాం…",
    fSubmit:"ఉచిత ప్రకటన పెట్టండి", fPosted:"✅ ప్రకటన పోస్ట్ అయింది!",
    loginToPost:"ప్రకటన పెట్టడానికి ముందు లాగిన్ అవ్వండి.",
    listingsTitle:"అన్ని ప్రకటనలు", noListings:"ప్రకటనలు కనిపించలేదు.",
    filterAll:"అన్నీ", filterLand:"భూమి", filterHouse:"ఇల్లు", filterPlot:"ప్లాట్", filterSold:"అమ్మబడింది",
    typeLabel:"రకం", loading:"లోడ్ అవుతున్నాయి…", syncErr:"సమకాలీకరణ విఫలమైంది.",
    markSold:"అమ్మబడింది", markAvailable:"అందుబాటులో ఉంది",
    soldBadge:"అమ్మబడింది", soldOn:"అమ్మిన తేదీ:",
    onlyYourListing:"మీ ప్రకటన మాత్రమే మార్చగలరు.",
    contactHidden:"📞 సంప్రదింపు దాచబడింది — అడ్మిన్‌ను అడగండి.",
    contactCall:"📞 కాల్ చేయండి:",
    waShare:"WhatsApp", qrBtn:"QR కోడ్", deleteBtn:"తొలగించు",
    nCount:(n)=>`${n} ప్రకటన${n===1?"":"లు"}`,
    adminTitle:"అడ్మిన్ యాక్సెస్", adminHint:"అడ్మిన్ నంబర్లు, GPS, సందేశాలు మరియు ప్రకటనలు నిర్వహించగలరు.",
    adminLocked:"🔒 లాక్", adminUnlocked:"🔓 తెరవబడింది",
    adminCodePh:"పాస్‌కోడ్ నమోదు చేయండి", adminUnlock:"తెరవండి", adminLock:"లాక్",
    adminWrong:"తప్పు పాస్‌కోడ్.",
    changePwdTitle:"పాస్‌వర్డ్ మార్చండి",
    cpCurrent:"ప్రస్తుత", cpNew:"కొత్త", cpConfirm:"నిర్ధారించు",
    cpBtn:"అప్‌డేట్", cpOk:"✅ పాస్‌వర్డ్ అప్‌డేట్ అయింది!", cpMismatch:"సరిపోలడం లేదు.", cpWrong:"తప్పు పాస్‌వర్డ్.",
    inboxTitle:"నా సందేశాలు", inboxEmpty:"సందేశాలు లేవు.", inboxFrom:"అడ్మిన్ నుండి", inboxRead:"చదివాను", unread:"చదవలేదు",
    adminUsersTitle:"నమోదైన వినియోగదారులు", adminMsgTitle:"వినియోగదారుకు సందేశం పంపండి",
    adminMsgPh:"సందేశం టైప్ చేయండి…", adminMsgSend:"పంపండి", adminMsgSent:"✅ పంపబడింది!", adminMsgLabel:"సందేశం",
    noUsers:"ఇంకా ఎవరూ నమోదు కాలేదు.", gpsLabel:"GPS",
  },
};

// ═══════════════════════════════════════════════════════════════
//  CONSTANTS
// ═══════════════════════════════════════════════════════════════
const ADMIN_PWD_KEY   = "bp_admin_pwd";
const ADMIN_SES_KEY   = "bp_admin_ses";
const LANG_KEY        = "bp_lang_v5";
const USER_SES_KEY    = "bp_user_ses";
const LISTINGS_KEY    = "bp_listings_v5";
const USERS_KEY       = "bp_users_v5";
const MSGS_KEY        = "bp_msgs_v5";

const PLACEHOLDER_SVG = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 300"><rect width="480" height="300" fill="#e8dcc8"/><path d="M80 200 L80 120 L160 60 L240 120 L240 200Z" fill="#8B6914"/><path d="M240 200 L240 100 L350 40 L460 100 L460 200Z" fill="#D4A843"/><rect x="100" y="150" width="40" height="50" fill="#fff" opacity=".8"/><rect x="270" y="130" width="60" height="45" fill="#fff" opacity=".8"/><circle cx="400" cy="55" r="30" fill="#F5C842" opacity=".7"/><rect x="0" y="240" width="480" height="60" fill="#7a9e6e" opacity=".4"/></svg>`
)}`;

const STARTER_LISTINGS = [
  { id:1, title:"Agricultural land near Bagepalli", desc:"Flat land for paddy or groundnut. Borewell nearby.", price:850000, location:"Bagepalli", type:"Land", contact:"9876543210", image:PLACEHOLDER_SVG, date:"2025-05-01", gps:null, sold:false, soldDate:null, ownerMobile:"9876543210" },
  { id:2, title:"House plot close to main road", desc:"Clear layout plot, electricity and water available.", price:420000, location:"Chilakalanerpu", type:"Plot", contact:"9123456780", image:PLACEHOLDER_SVG, date:"2025-05-03", gps:null, sold:false, soldDate:null, ownerMobile:"9123456780" },
  { id:3, title:"Village house for sale", desc:"3 rooms, parking, cattle shed. Documents ready.", price:650000, location:"Gauribidanur Road", type:"House", contact:"9988776655", image:PLACEHOLDER_SVG, date:"2025-05-10", gps:{lat:13.7726,lng:77.5182}, sold:false, soldDate:null, ownerMobile:"9988776655" },
  { id:4, title:"2 acre irrigated farm", desc:"Drip irrigation. Mango trees. Clear title.", price:1200000, location:"Veerapura", type:"Land", contact:"9443322110", image:PLACEHOLDER_SVG, date:"2025-05-18", gps:null, sold:false, soldDate:null, ownerMobile:"9443322110" },
];

// ═══════════════════════════════════════════════════════════════
//  STORAGE HELPERS  (shared via window.storage when available)
// ═══════════════════════════════════════════════════════════════
const ls = {
  get:(k,def)=>{ try{ const v=localStorage.getItem(k); return v?JSON.parse(v):def; }catch{return def;} },
  set:(k,v)=>{ try{ localStorage.setItem(k,JSON.stringify(v)); }catch{} },
};

async function sharedGet(key, def) {
  try {
    if (window.storage) {
      const r = await window.storage.get(key, true);
      if (r?.value) { const d=JSON.parse(r.value); ls.set(key,d); return d; }
    }
  } catch {}
  return ls.get(key, def);
}
async function sharedSet(key, val) {
  ls.set(key, val);
  try { if (window.storage) await window.storage.set(key, JSON.stringify(val), true); } catch {}
}

const fmt = p => new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(p);
const today = () => new Date().toISOString().slice(0,10);
const readB64 = f => new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(r.result);r.onerror=rej;r.readAsDataURL(f);});
const qrUrl  = t => `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(t)}`;
const waText = l => `🏡 *${l.title}*\n💰 ${fmt(l.price)}\n📍 ${l.location}\n🏷️ ${l.type}${l.sold?" — ✅ SOLD":""}\n${l.desc?"📝 "+l.desc+"\n":""}Posted on Bagepalli Properties`;
const getAdminPwd = () => ls.get(ADMIN_PWD_KEY, "1234");
const setAdminPwd = p => ls.set(ADMIN_PWD_KEY, p);

// ═══════════════════════════════════════════════════════════════
//  CSS
// ═══════════════════════════════════════════════════════════════
const css = `
@import url('https://fonts.googleapis.com/css2?family=Yeseva+One&family=Nunito:wght@400;600;700;800;900&display=swap');
:root{
  --bg:#fdf8f0;--surface:#fff;--border:#ddd0b8;
  --brand:#2e6b35;--brand2:#1a4d20;--brand-light:#e8f5e9;
  --accent:#e8a020;--accent2:#c47e10;
  --sold:#b33a24;--sold-bg:#fff0ed;--sold-border:#f5b8af;
  --wa:#25D366;--wa2:#128C7E;
  --blue:#1565c0;--blue-bg:#e3f2fd;
  --text:#1c2218;--muted:#6b6050;
  --radius:10px;--shadow:0 2px 14px rgba(0,0,0,.09);
}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Nunito',sans-serif;background:var(--bg);color:var(--text);line-height:1.5}
#root{min-height:100vh;display:flex;flex-direction:column}

/* ─ HEADER ─ */
.hdr{background:linear-gradient(135deg,#2e6b35,#1a4d20);color:#fff;position:relative;overflow:hidden;flex-shrink:0}
.hdr::before{content:'';position:absolute;inset:0;background:url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-opacity='0.04'%3E%3Cpath d='M0 0h20v20H0zM20 20h20v20H20z'/%3E%3C/g%3E%3C/svg%3E")}
.hdr-inner{position:relative;max-width:1060px;margin:0 auto;padding:18px 16px 14px;display:flex;align-items:center;gap:12px}
.hdr-icon{width:46px;height:46px;background:rgba(255,255,255,.15);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0}
.hdr h1{font-family:'Yeseva One',serif;font-size:clamp(1.2rem,3.5vw,1.8rem);line-height:1.2}
.hdr p{font-size:.87rem;opacity:.8;margin-top:2px}
.hdr-right{margin-left:auto;display:flex;align-items:center;gap:8px;flex-shrink:0}
.hdr-user{background:rgba(255,255,255,.15);border-radius:20px;padding:5px 12px;font-size:.8rem;font-weight:700;color:#fff;cursor:pointer;border:0;white-space:nowrap}
.hdr-user:hover{background:rgba(255,255,255,.25)}
.unread-dot{background:#e8a020;color:#fff;border-radius:50%;width:18px;height:18px;font-size:.7rem;font-weight:900;display:inline-flex;align-items:center;justify-content:center;margin-left:4px}

/* ─ BOTTOM NAV ─ */
.bnav{position:fixed;bottom:0;left:0;right:0;background:#fff;border-top:1px solid var(--border);display:flex;z-index:100;box-shadow:0 -2px 12px rgba(0,0,0,.08)}
.bnav-btn{flex:1;padding:10px 4px 8px;display:flex;flex-direction:column;align-items:center;gap:3px;font:700 .7rem 'Nunito',sans-serif;color:var(--muted);border:0;background:0;cursor:pointer;position:relative}
.bnav-btn.active{color:var(--brand)}
.bnav-btn .icon{font-size:1.3rem}
.bnav-badge{position:absolute;top:6px;right:calc(50% - 18px);background:#e8a020;color:#fff;border-radius:50%;width:16px;height:16px;font-size:.62rem;font-weight:900;display:flex;align-items:center;justify-content:center}

/* ─ LAYOUT ─ */
.lay{max-width:1060px;margin:0 auto;padding:12px 14px 80px;flex:1;width:100%}

/* ─ PANEL ─ */
.panel{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:15px 17px;margin-bottom:11px}
.panel-title{font-size:1.05rem;font-weight:800;margin-bottom:12px}

/* ─ INPUTS ─ */
.field{margin-bottom:12px}
.field label{display:block;font-weight:700;font-size:.87rem;margin-bottom:5px}
.field input,.field textarea,.field select{width:100%;padding:10px 12px;border:1.5px solid var(--border);border-radius:7px;font:inherit;background:var(--bg)}
.field input:focus,.field textarea:focus,.field select:focus{outline:none;border-color:var(--brand);background:#fff}
.field textarea{resize:vertical;min-height:78px}
.hint{font-size:.82rem;color:var(--muted);margin-top:5px}

/* ─ FORM GRID ─ */
.form-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.form-grid .full{grid-column:1/-1}

/* ─ BUTTONS ─ */
.btn{padding:10px 16px;border:0;border-radius:7px;font:700 .88rem 'Nunito',sans-serif;cursor:pointer;transition:all .13s;display:inline-flex;align-items:center;gap:5px;white-space:nowrap}
.btn-primary{background:var(--brand);color:#fff}.btn-primary:hover{background:var(--brand2)}
.btn-ghost{background:#eee;color:var(--muted)}.btn-ghost:hover{background:#ddd}
.btn-accent{background:var(--accent);color:#fff;width:100%;padding:13px;font-size:1rem;font-weight:900;border-radius:8px;justify-content:center}.btn-accent:hover{background:var(--accent2)}
.btn-wa{background:var(--wa);color:#fff;font-size:.8rem;padding:7px 11px}.btn-wa:hover{background:var(--wa2)}
.btn-qr{background:var(--blue-bg);color:var(--blue);border:1px solid #c8d4f5;font-size:.8rem;padding:7px 11px}.btn-qr:hover{background:#d0e5ff}
.btn-sold{background:#fff3e0;color:#b05a00;border:1px solid #f5d9a0;font-size:.8rem;padding:7px 11px}.btn-sold:hover{background:#ffe8c0}
.btn-avail{background:var(--brand-light);color:var(--brand2);border:1px solid #a8d8b4;font-size:.8rem;padding:7px 11px}.btn-avail:hover{background:#d0edd7}
.btn-danger{background:#fde8e4;color:var(--sold);border:1px solid var(--sold-border);font-size:.8rem;padding:7px 11px}.btn-danger:hover{background:#f9cfc9}
.btn-sm{font-size:.82rem;padding:7px 12px}
.btn-full{width:100%;justify-content:center}

/* ─ TOAST ─ */
.toast{border-radius:7px;padding:9px 13px;font-weight:700;margin-top:9px;font-size:.9rem}
.toast.ok{background:#e4f5e8;color:var(--brand2);border:1px solid #a8d8b4}
.toast.err{background:#fde8e4;color:var(--sold);border:1px solid var(--sold-border)}
.toast.warn{background:#fff8e8;border:1px solid #f5dfa0;color:#7a5c00}

/* ─ SEARCH ─ */
.srch{position:relative}
.srch input{width:100%;padding:11px 14px 11px 40px;border:1.5px solid var(--border);border-radius:8px;font:inherit;font-size:.97rem;background:var(--bg)}
.srch input:focus{outline:none;border-color:var(--brand);background:#fff}
.srch-icon{position:absolute;left:12px;top:50%;transform:translateY(-50%);font-size:16px;pointer-events:none}

/* ─ CHIPS ─ */
.chips{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:11px}
.chip{padding:5px 14px;border-radius:20px;border:1.5px solid var(--border);background:#fff;font:700 .83rem 'Nunito',sans-serif;cursor:pointer;transition:all .13s}
.chip:hover{border-color:var(--brand);color:var(--brand)}
.chip.active{background:var(--brand);color:#fff;border-color:var(--brand)}
.chip.sold-chip.active{background:var(--sold);border-color:var(--sold)}

/* ─ CARD GRID ─ */
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(255px,1fr));gap:14px}
.lst-hdr{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:11px;flex-wrap:wrap}
.lst-hdr h2{font-size:1.12rem;font-weight:800}
.cnt{font-size:.82rem;font-weight:700;color:var(--muted)}

/* ─ CARD ─ */
.card{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);overflow:hidden;box-shadow:var(--shadow);transition:transform .13s,box-shadow .13s;animation:fadeUp .25s ease both;position:relative}
.card:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,.12)}
@keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
.card.sold-card{opacity:.85}
.sold-ribbon{position:absolute;top:12px;left:-28px;background:var(--sold);color:#fff;font-size:.7rem;font-weight:900;padding:4px 36px;transform:rotate(-45deg);letter-spacing:.06em;z-index:2}
.card-img{width:100%;height:165px;object-fit:cover;display:block;background:#e8dcc8}
.card-body{padding:11px 13px 8px}
.card-top{display:flex;align-items:flex-start;justify-content:space-between;gap:6px;margin-bottom:5px}
.type-badge{font-size:.7rem;font-weight:800;text-transform:uppercase;letter-spacing:.06em;padding:3px 8px;border-radius:4px;background:#e8f5e9;color:var(--brand2);flex-shrink:0}
.type-badge.House{background:#fff3e0;color:#b05a00}
.type-badge.Plot{background:var(--blue-bg);color:var(--blue)}
.type-badge.sold{background:var(--sold-bg);color:var(--sold)}
.card h3{font-size:.95rem;font-weight:800;line-height:1.3;margin-bottom:4px}
.card-price{font-size:1.1rem;font-weight:800;color:var(--brand);margin-bottom:3px}
.card-price.sold-price{color:var(--sold);text-decoration:line-through;opacity:.7}
.card-loc{font-size:.82rem;color:var(--muted);margin-bottom:5px}
.card-desc{font-size:.83rem;color:#4a4035;line-height:1.4;margin-bottom:8px}
.card-contact{background:#f5f0e8;border-radius:6px;padding:7px 10px;font-size:.83rem;color:var(--muted);font-weight:600;margin-bottom:6px}
.card-contact a{color:var(--brand2);font-weight:700;text-decoration:none}
.card-contact a:hover{text-decoration:underline}
.card-gps{display:flex;align-items:center;gap:5px;padding:5px 9px;background:var(--blue-bg);border-radius:6px;font-size:.78rem;color:var(--blue);font-weight:600;margin-bottom:6px}
.sold-info{background:var(--sold-bg);border-radius:6px;padding:6px 10px;font-size:.78rem;color:var(--sold);font-weight:700;margin-bottom:6px}
.card-date{font-size:.73rem;color:#bbb;margin-bottom:7px}
.card-actions{display:flex;gap:5px;flex-wrap:wrap;padding:0 13px 11px}

/* ─ ADMIN PANEL ─ */
.adm-hdr{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:9px;flex-wrap:wrap}
.badge{font-size:.75rem;font-weight:800;padding:3px 10px;border-radius:20px}
.badge.locked{background:#fde8e4;color:var(--sold)}
.badge.unlocked{background:var(--brand-light);color:var(--brand2)}
.adm-row{display:flex;gap:8px}
.adm-row input{flex:1;padding:10px 12px;border:1.5px solid var(--border);border-radius:7px;font:inherit}
.adm-row input:focus{outline:none;border-color:var(--brand)}
.adm-actions{display:flex;gap:7px;flex-wrap:wrap;margin-top:9px}
.pwd-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-top:10px}
.section-divider{border:0;border-top:1px solid var(--border);margin:14px 0}

/* ─ USER TABLE ─ */
.user-row{display:flex;align-items:center;justify-content:space-between;padding:9px 0;border-bottom:1px solid var(--border);gap:8px;flex-wrap:wrap}
.user-row:last-child{border-bottom:0}
.user-info{font-size:.88rem}
.user-name{font-weight:800}
.user-mobile{color:var(--muted);font-size:.8rem}
.msg-input-row{display:flex;gap:7px;margin-top:6px}
.msg-input-row input{flex:1;padding:8px 11px;border:1.5px solid var(--border);border-radius:7px;font:inherit;font-size:.88rem}
.msg-input-row input:focus{outline:none;border-color:var(--brand)}

/* ─ INBOX ─ */
.msg-card{background:var(--surface);border:1px solid var(--border);border-radius:8px;padding:12px 14px;margin-bottom:9px;animation:fadeUp .2s ease}
.msg-card.unread{border-left:3px solid var(--accent);background:#fffdf5}
.msg-meta{font-size:.76rem;color:var(--muted);margin-bottom:5px;display:flex;align-items:center;justify-content:space-between}
.msg-text{font-size:.9rem;line-height:1.45}
.unread-tag{background:var(--accent);color:#fff;font-size:.68rem;font-weight:800;padding:2px 7px;border-radius:10px}

/* ─ LOGIN PAGE ─ */
.login-wrap{max-width:400px;margin:20px auto}
.gps-btn{display:flex;align-items:center;gap:8px;padding:10px 13px;border:1.5px dashed var(--border);border-radius:7px;background:var(--bg);font:600 .87rem 'Nunito',sans-serif;cursor:pointer;transition:all .13s;width:100%}
.gps-btn:hover{border-color:var(--brand);color:var(--brand)}
.gps-btn.ok{border-color:var(--brand);background:var(--brand-light);color:var(--brand2)}
.gps-btn.err{border-color:var(--sold);background:var(--sold-bg);color:var(--sold)}
.img-preview{margin-top:7px;height:85px;border-radius:6px;object-fit:cover}

/* ─ MISC ─ */
.empty{text-align:center;padding:36px 16px;color:var(--muted);font-weight:600;font-size:.95rem}
.loading{text-align:center;padding:36px;color:var(--muted);font-weight:600}
.sync-err{background:#fff8e8;border:1px solid #f5dfa0;border-radius:7px;padding:7px 13px;font-size:.82rem;color:#7a5c00;font-weight:600;margin-bottom:9px}

/* ─ MODAL ─ */
.overlay{position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:200;display:flex;align-items:center;justify-content:center;padding:16px;animation:fadeIn .15s ease}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
.modal{background:#fff;border-radius:13px;padding:22px;max-width:300px;width:100%;text-align:center;box-shadow:0 16px 48px rgba(0,0,0,.25);animation:scaleIn .15s ease}
@keyframes scaleIn{from{opacity:0;transform:scale(.95)}to{opacity:1;transform:none}}
.modal h3{font-size:.97rem;font-weight:800;margin-bottom:5px}
.modal p{font-size:.8rem;color:var(--muted);margin-bottom:12px}
.modal img{border-radius:7px;border:1px solid var(--border);width:170px;height:170px}

@media(max-width:600px){
  .form-grid{grid-template-columns:1fr}.form-grid .full{grid-column:1}
  .pwd-grid{grid-template-columns:1fr}
  .adm-row{flex-direction:column}
  .hdr-inner{padding:14px 12px 12px}
  .lay{padding:10px 10px 78px}
}
`;

// ═══════════════════════════════════════════════════════════════
//  QR MODAL
// ═══════════════════════════════════════════════════════════════
function QRModal({ listing, onClose }) {
  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={e=>e.stopPropagation()}>
        <h3>QR Code</h3>
        <p>{listing.title} — {listing.location}</p>
        <img src={qrUrl(waText(listing))} alt="QR" />
        <p style={{marginTop:9,fontSize:".75rem",color:"#aaa"}}>Scan to share property details</p>
        <button className="btn btn-ghost btn-full" style={{marginTop:12}} onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
//  MAIN APP
// ═══════════════════════════════════════════════════════════════
export default function App() {
  const [lang,   setLang]   = useState(()=>ls.get(LANG_KEY,"en"));
  const [tab,    setTab]    = useState("listings");  // listings | post | inbox | login | admin-users
  const [listings, setListings] = useState([]);
  const [users,    setUsers]    = useState([]);       // [{mobile, name, createdAt}]
  const [messages, setMessages] = useState([]);       // [{id,toMobile,text,date,read}]
  const [loading, setLoading]   = useState(true);
  const [syncErr, setSyncErr]   = useState(false);

  // auth
  const [currentUser, setCurrentUser] = useState(()=>ls.get(USER_SES_KEY,null));
  const [admin,       setAdmin]       = useState(()=>sessionStorage.getItem(ADMIN_SES_KEY)==="1");
  const [adminPwd,    setAdminPwdState]= useState("");
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  // forms
  const [loginForm,  setLoginForm]  = useState({mobile:"",name:""});
  const [loginMsg,   setLoginMsg]   = useState(null);
  const [isNewUser,  setIsNewUser]  = useState(false);

  const [postForm,  setPostForm]  = useState({title:"",desc:"",price:"",location:"",type:"Land",contact:"",image:null,gps:null});
  const [gpsStatus, setGpsStatus] = useState("idle");
  const [postOk,    setPostOk]    = useState(false);
  const fileRef = useRef();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [qrListing, setQrListing] = useState(null);

  const [showPwdChange, setShowPwdChange] = useState(false);
  const [pwdForm, setPwdForm]   = useState({cur:"",next:"",conf:""});
  const [pwdMsg,  setPwdMsg]    = useState(null);
  const [showAdminUsers, setShowAdminUsers] = useState(false);
  const [msgDraft, setMsgDraft] = useState({});   // {mobile: draftText}
  const [msgSent,  setMsgSent]  = useState({});   // {mobile: bool}

  const t = T[lang];

  // ── Load shared data ──────────────────────────────────────────
  useEffect(()=>{
    setLoading(true);
    Promise.all([
      sharedGet(LISTINGS_KEY, STARTER_LISTINGS),
      sharedGet(USERS_KEY,    []),
      sharedGet(MSGS_KEY,     []),
    ]).then(([l,u,m])=>{
      setListings(l); setUsers(u); setMessages(m); setLoading(false);
    }).catch(()=>{
      setListings(ls.get(LISTINGS_KEY, STARTER_LISTINGS));
      setUsers(ls.get(USERS_KEY, []));
      setMessages(ls.get(MSGS_KEY, []));
      setSyncErr(true); setLoading(false);
    });
  },[]);

  useEffect(()=>{ ls.set(LANG_KEY,lang); },[lang]);

  const saveListings = useCallback(async(next)=>{ setListings(next); await sharedSet(LISTINGS_KEY,next); },[]);
  const saveUsers    = useCallback(async(next)=>{ setUsers(next);    await sharedSet(USERS_KEY,next); },[]);
  const saveMessages = useCallback(async(next)=>{ setMessages(next); await sharedSet(MSGS_KEY,next); },[]);

  // ── Unread count for current user ────────────────────────────
  const unreadCount = currentUser
    ? messages.filter(m=>m.toMobile===currentUser.mobile && !m.read).length
    : 0;

  // ── User login ───────────────────────────────────────────────
  const handleLogin = async()=>{
    const mob = loginForm.mobile.trim();
    if(!/^\d{10}$/.test(mob)){ setLoginMsg({err:true,text:"Enter a valid 10-digit mobile number."}); return; }
    const existing = users.find(u=>u.mobile===mob);
    if(existing){
      setCurrentUser(existing); ls.set(USER_SES_KEY,existing);
      setIsNewUser(false); setLoginMsg({err:false,text:`${t.welcomeBack} ${existing.name}`});
    } else {
      const name = loginForm.name.trim() || mob;
      const nu = {mobile:mob, name, createdAt:today()};
      const next = [...users, nu];
      await saveUsers(next);
      setCurrentUser(nu); ls.set(USER_SES_KEY,nu);
      setIsNewUser(true); setLoginMsg({err:false,text:`${t.newUser}: ${name}`});
    }
    setTimeout(()=>{ setLoginMsg(null); setTab("listings"); },2000);
  };

  const handleLogout = ()=>{
    setCurrentUser(null); ls.set(USER_SES_KEY,null);
    sessionStorage.removeItem(USER_SES_KEY);
  };

  // ── Admin login ──────────────────────────────────────────────
  const handleAdminUnlock = ()=>{
    if(adminPwd===getAdminPwd()){ setAdmin(true); sessionStorage.setItem(ADMIN_SES_KEY,"1"); setAdminPwdState(""); }
    else { alert(t.adminWrong); setAdminPwdState(""); }
  };
  const handleAdminLock = ()=>{ setAdmin(false); sessionStorage.removeItem(ADMIN_SES_KEY); setShowAdminPanel(false); setShowAdminUsers(false); };

  // ── Change password ──────────────────────────────────────────
  const handleChangePwd = ()=>{
    if(pwdForm.cur!==getAdminPwd()){ setPwdMsg({err:true,text:t.cpWrong}); return; }
    if(pwdForm.next!==pwdForm.conf){ setPwdMsg({err:true,text:t.cpMismatch}); return; }
    if(!pwdForm.next.trim()) return;
    setAdminPwd(pwdForm.next.trim());
    setPwdMsg({err:false,text:t.cpOk});
    setPwdForm({cur:"",next:"",conf:""});
    setTimeout(()=>{ setPwdMsg(null); setShowPwdChange(false); },2500);
  };

  // ── GPS ──────────────────────────────────────────────────────
  const captureGps = ()=>{
    if(!navigator.geolocation){ setGpsStatus("err"); return; }
    setGpsStatus("loading");
    navigator.geolocation.getCurrentPosition(
      pos=>{ setPostForm(p=>({...p,gps:{lat:pos.coords.latitude,lng:pos.coords.longitude}})); setGpsStatus("ok"); },
      ()=>setGpsStatus("err"), {enableHighAccuracy:true,timeout:10000}
    );
  };

  // ── Post listing ─────────────────────────────────────────────
  const handlePost = async(e)=>{
    e.preventDefault();
    if(!postForm.title||!postForm.price||!postForm.location||!postForm.contact) return;
    const listing = {
      id:Date.now(), title:postForm.title.trim(), desc:postForm.desc.trim(),
      price:Number(postForm.price), location:postForm.location.trim(),
      type:postForm.type, contact:postForm.contact.trim(),
      image:postForm.image||PLACEHOLDER_SVG, date:today(), gps:postForm.gps||null,
      sold:false, soldDate:null,
      ownerMobile: currentUser?.mobile || postForm.contact.trim(),
    };
    await saveListings([listing,...listings]);
    setPostForm({title:"",desc:"",price:"",location:"",type:"Land",contact:"",image:null,gps:null});
    setGpsStatus("idle");
    if(fileRef.current) fileRef.current.value="";
    setPostOk(true);
    setTimeout(()=>{ setPostOk(false); setTab("listings"); },2500);
  };

  // ── Mark sold/available ──────────────────────────────────────
  const toggleSold = async(listing)=>{
    const isOwner = currentUser?.mobile === listing.ownerMobile;
    if(!isOwner && !admin){ alert(t.onlyYourListing); return; }
    const next = listings.map(l => l.id===listing.id
      ? {...l, sold:!l.sold, soldDate:!l.sold?today():null}
      : l
    );
    await saveListings(next);
  };

  // ── Delete ───────────────────────────────────────────────────
  const deleteListing = useCallback(async(id)=>{
    await saveListings(listings.filter(l=>l.id!==id));
  },[listings,saveListings]);

  // ── Admin send message ───────────────────────────────────────
  const sendMessage = async(toMobile)=>{
    const text = (msgDraft[toMobile]||"").trim();
    if(!text) return;
    const msg = {id:Date.now(), toMobile, text, date:today(), read:false};
    const next = [...messages, msg];
    await saveMessages(next);
    setMsgDraft(p=>({...p,[toMobile]:""}));
    setMsgSent(p=>({...p,[toMobile]:true}));
    setTimeout(()=>setMsgSent(p=>({...p,[toMobile]:false})),2500);
  };

  // ── Mark message read ────────────────────────────────────────
  const markRead = async(id)=>{
    const next = messages.map(m=>m.id===id?{...m,read:true}:m);
    await saveMessages(next);
  };

  // ── Filter listings ──────────────────────────────────────────
  const filtered = listings.filter(l=>{
    const q=search.trim().toLowerCase();
    const pm=parseInt(q.replace(/\D/g,""),10);
    const textOk=!q||`${l.title} ${l.location}`.toLowerCase().includes(q)||(pm>0&&l.price<=pm);
    const typeOk=filter==="All"||(filter==="Sold"?l.sold:(l.type===filter&&!l.sold))||
                 (filter!=="Sold"&&filter!=="All"&&l.type===filter);
    // re-do:
    let fOk;
    if(filter==="All")          fOk=true;
    else if(filter==="Sold")    fOk=l.sold;
    else                        fOk=l.type===filter;
    return textOk&&fOk;
  });

  const myInbox = messages.filter(m=>m.toMobile===currentUser?.mobile)
    .sort((a,b)=>b.id-a.id);

  // ─────────────────────────────────────────────────────────────
  //  RENDER
  // ─────────────────────────────────────────────────────────────
  return (
    <>
      <style>{css}</style>
      {qrListing && <QRModal listing={qrListing} onClose={()=>setQrListing(null)} />}

      {/* ── HEADER ── */}
      <header className="hdr">
        <div className="hdr-inner">
          <div className="hdr-icon">🏡</div>
          <div>
            <h1>{t.siteTitle}</h1>
            <p>{t.siteSubtitle}</p>
          </div>
          <div className="hdr-right">
            {currentUser
              ? <button className="hdr-user" onClick={()=>setTab("inbox")}>
                  👤 {currentUser.name.split(" ")[0]}
                  {unreadCount>0&&<span className="unread-dot">{unreadCount}</span>}
                </button>
              : <button className="hdr-user" onClick={()=>setTab("login")}>👤 {t.navLogin}</button>
            }
            <button className="hdr-user" onClick={()=>setShowAdminPanel(p=>!p)} style={{background:admin?"rgba(255,232,100,.25)":"rgba(255,255,255,.15)"}}>
              {admin?"🔓":"🔒"}
            </button>
          </div>
        </div>
      </header>

      {/* ── ADMIN PANEL (collapsible) ── */}
      {showAdminPanel && (
        <div style={{background:"#fffdf5",borderBottom:"1px solid #e8dca0"}}>
          <div style={{maxWidth:1060,margin:"0 auto",padding:"14px 16px"}}>
            <div className="adm-hdr">
              <span style={{fontWeight:800,fontSize:".97rem"}}>{t.adminTitle}</span>
              <span className={`badge ${admin?"unlocked":"locked"}`}>{admin?t.adminUnlocked:t.adminLocked}</span>
            </div>
            <p className="hint" style={{marginBottom:9}}>{t.adminHint}</p>
            {!admin ? (
              <div className="adm-row">
                <input type="password" inputMode="numeric" placeholder={t.adminCodePh}
                  value={adminPwd} onChange={e=>setAdminPwdState(e.target.value)}
                  onKeyDown={e=>e.key==="Enter"&&handleAdminUnlock()} />
                <button className="btn btn-primary" onClick={handleAdminUnlock}>{t.adminUnlock}</button>
              </div>
            ) : (
              <>
                <div className="adm-actions">
                  <button className="btn btn-ghost btn-sm" onClick={handleAdminLock}>{t.adminLock}</button>
                  <button className="btn btn-ghost btn-sm" onClick={()=>setShowPwdChange(p=>!p)}>🔑 {t.changePwdTitle}</button>
                  <button className="btn btn-ghost btn-sm" onClick={()=>{ setShowAdminUsers(p=>!p); setTab("listings"); }}>👥 {t.adminUsersTitle}</button>
                </div>
                {showPwdChange && (
                  <div style={{marginTop:12}}>
                    <hr className="section-divider" />
                    <div className="pwd-grid">
                      <div className="field"><label>{t.cpCurrent}</label><input type="password" value={pwdForm.cur} onChange={e=>setPwdForm(p=>({...p,cur:e.target.value}))} /></div>
                      <div className="field"><label>{t.cpNew}</label><input type="password" value={pwdForm.next} onChange={e=>setPwdForm(p=>({...p,next:e.target.value}))} /></div>
                      <div className="field"><label>{t.cpConfirm}</label><input type="password" value={pwdForm.conf} onChange={e=>setPwdForm(p=>({...p,conf:e.target.value}))} /></div>
                    </div>
                    <button className="btn btn-primary btn-sm" onClick={handleChangePwd}>{t.cpBtn}</button>
                    {pwdMsg&&<div className={`toast ${pwdMsg.err?"err":"ok"}`} style={{marginTop:7}}>{pwdMsg.text}</div>}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}

      <div className="lay">
        {syncErr && <div className="sync-err">⚠️ {t.syncErr}</div>}

        {/* ══ TAB: LOGIN ══ */}
        {tab==="login" && (
          <div className="login-wrap">
            <div className="panel">
              <p className="panel-title">👤 {t.userLoginTitle}</p>
              <p className="hint" style={{marginBottom:12}}>{t.userLoginSub}</p>
              {currentUser ? (
                <>
                  <div className="toast ok" style={{marginBottom:10}}>
                    ✅ {t.welcomeBack} <strong>{currentUser.name}</strong> ({currentUser.mobile})
                  </div>
                  <button className="btn btn-ghost btn-full" onClick={handleLogout}>{t.logoutBtn}</button>
                </>
              ) : (
                <>
                  <div className="field">
                    <label>{t.mobileLabel}</label>
                    <input type="tel" placeholder={t.mobilePh} value={loginForm.mobile}
                      onChange={e=>setLoginForm(p=>({...p,mobile:e.target.value}))}
                      onKeyDown={e=>e.key==="Enter"&&handleLogin()} />
                  </div>
                  <div className="field">
                    <label>{t.nameLabel} <span style={{color:t.muted,fontWeight:400}}>(new users only)</span></label>
                    <input type="text" placeholder={t.namePh} value={loginForm.name}
                      onChange={e=>setLoginForm(p=>({...p,name:e.target.value}))}
                      onKeyDown={e=>e.key==="Enter"&&handleLogin()} />
                  </div>
                  <button className="btn btn-accent" onClick={handleLogin}>{t.loginBtn}</button>
                  {loginMsg&&<div className={`toast ${loginMsg.err?"err":"ok"}`} style={{marginTop:9}}>{loginMsg.text}</div>}
                </>
              )}
            </div>
          </div>
        )}

        {/* ══ TAB: INBOX ══ */}
        {tab==="inbox" && (
          <div>
            <div className="lst-hdr">
              <h2>📬 {t.inboxTitle}</h2>
              {unreadCount>0&&<span className="cnt">{unreadCount} {t.unread}</span>}
            </div>
            {!currentUser ? (
              <div className="empty">
                <p>Please <button className="btn btn-primary btn-sm" onClick={()=>setTab("login")}>login</button> to see your inbox.</p>
              </div>
            ) : myInbox.length===0 ? (
              <div className="empty">{t.inboxEmpty}</div>
            ) : (
              myInbox.map(m=>(
                <div key={m.id} className={`msg-card ${m.read?"":"unread"}`}>
                  <div className="msg-meta">
                    <span>📨 {t.inboxFrom} — {m.date}</span>
                    {!m.read&&<span className="unread-tag">{t.unread}</span>}
                  </div>
                  <p className="msg-text">{m.text}</p>
                  {!m.read&&(
                    <button className="btn btn-ghost btn-sm" style={{marginTop:8}} onClick={()=>markRead(m.id)}>
                      ✓ {t.inboxRead}
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* ══ ADMIN: USERS ══ */}
        {admin && showAdminUsers && tab==="listings" && (
          <div className="panel" style={{marginBottom:11}}>
            <p className="panel-title">👥 {t.adminUsersTitle} ({users.length})</p>
            {users.length===0 ? <p className="hint">{t.noUsers}</p> : users.map(u=>(
              <div key={u.mobile} className="user-row">
                <div className="user-info">
                  <div className="user-name">{u.name}</div>
                  <div className="user-mobile">📞 {u.mobile} · Joined {u.createdAt}</div>
                  <div className="user-mobile">
                    Messages received: {messages.filter(m=>m.toMobile===u.mobile).length} · 
                    Unread: {messages.filter(m=>m.toMobile===u.mobile&&!m.read).length}
                  </div>
                </div>
                <div style={{flex:1,minWidth:200}}>
                  <div className="msg-input-row">
                    <input
                      placeholder={t.adminMsgPh}
                      value={msgDraft[u.mobile]||""}
                      onChange={e=>setMsgDraft(p=>({...p,[u.mobile]:e.target.value}))}
                      onKeyDown={e=>e.key==="Enter"&&sendMessage(u.mobile)}
                    />
                    <button className="btn btn-primary btn-sm" onClick={()=>sendMessage(u.mobile)}>{t.adminMsgSend}</button>
                  </div>
                  {msgSent[u.mobile]&&<div className="toast ok" style={{marginTop:5,padding:"5px 10px",fontSize:".8rem"}}>{t.adminMsgSent}</div>}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ══ TAB: POST ══ */}
        {tab==="post" && (
          <div className="panel">
            <p className="panel-title">📝 {t.postTitle}</p>
            {!currentUser && (
              <div className="toast warn" style={{marginBottom:12}}>
                ⚠️ {t.loginToPost} <button className="btn btn-primary btn-sm" style={{marginLeft:8}} onClick={()=>setTab("login")}>{t.navLogin}</button>
              </div>
            )}
            <form onSubmit={handlePost}>
              <div className="form-grid">
                <div className="field full"><label>{t.fTitle}</label>
                  <input required placeholder={t.fTitlePh} value={postForm.title} onChange={e=>setPostForm(p=>({...p,title:e.target.value}))} /></div>
                <div className="field full"><label>{t.fDesc}</label>
                  <textarea placeholder={t.fDescPh} value={postForm.desc} onChange={e=>setPostForm(p=>({...p,desc:e.target.value}))} /></div>
                <div className="field"><label>{t.fPrice}</label>
                  <input required type="number" min="0" placeholder={t.fPricePh} value={postForm.price} onChange={e=>setPostForm(p=>({...p,price:e.target.value}))} /></div>
                <div className="field"><label>{t.typeLabel}</label>
                  <select value={postForm.type} onChange={e=>setPostForm(p=>({...p,type:e.target.value}))}>
                    <option value="Land">{t.filterLand}</option>
                    <option value="House">{t.filterHouse}</option>
                    <option value="Plot">{t.filterPlot}</option>
                  </select></div>
                <div className="field"><label>{t.fLoc}</label>
                  <input required placeholder={t.fLocPh} value={postForm.location} onChange={e=>setPostForm(p=>({...p,location:e.target.value}))} /></div>
                <div className="field"><label>{t.fContact}</label>
                  <input required type="tel" placeholder={t.fContactPh}
                    value={postForm.contact || currentUser?.mobile || ""}
                    onChange={e=>setPostForm(p=>({...p,contact:e.target.value}))} />
                  <p className="hint">{t.fContactHint}</p></div>
                <div className="field full"><label>{t.fPhoto}</label>
                  <input type="file" accept="image/*" ref={fileRef} onChange={async e=>{ const f=e.target.files[0]; if(f){ const d=await readB64(f); setPostForm(p=>({...p,image:d})); }}} />
                  {postForm.image&&postForm.image!==PLACEHOLDER_SVG&&<img src={postForm.image} alt="preview" className="img-preview" />}
                </div>
                <div className="field full"><label>{t.gpsLabel}</label>
                  <button type="button" className={`gps-btn ${gpsStatus}`} onClick={captureGps}>
                    <span>{gpsStatus==="ok"?"✅":gpsStatus==="err"?"❌":gpsStatus==="loading"?"⏳":"📍"}</span>
                    <span>{gpsStatus==="ok"?t.fGpsOk:gpsStatus==="err"?t.fGpsErr:gpsStatus==="loading"?t.fGpsWait:t.fGps}</span>
                    {postForm.gps&&<span style={{marginLeft:"auto",fontSize:".73rem",opacity:.7}}>{postForm.gps.lat.toFixed(4)}, {postForm.gps.lng.toFixed(4)}</span>}
                  </button>
                </div>
              </div>
              <button type="submit" className="btn btn-accent">{t.fSubmit}</button>
              {postOk&&<div className="toast ok" style={{marginTop:9}}>✅ {t.fPosted}</div>}
            </form>
          </div>
        )}

        {/* ══ TAB: LISTINGS ══ */}
        {tab==="listings" && (
          <>
            {/* Language */}
            <div className="panel" style={{padding:"11px 16px"}}>
              <div style={{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"}}>
                <label style={{fontWeight:700,fontSize:".87rem",color:"var(--muted)",flexShrink:0}}>{t.langLabel}:</label>
                <select value={lang} onChange={e=>setLang(e.target.value)}
                  style={{flex:1,minWidth:140,maxWidth:210,border:"1px solid var(--border)",borderRadius:7,padding:"8px 11px",font:"inherit",background:"var(--bg)"}}>
                  <option value="en">English</option>
                  <option value="kn">ಕನ್ನಡ</option>
                  <option value="te">తెలుగు</option>
                </select>
              </div>
            </div>
            {/* Search */}
            <div className="panel">
              <div className="srch">
                <span className="srch-icon">🔍</span>
                <input type="search" placeholder={t.searchPlaceholder} value={search} onChange={e=>setSearch(e.target.value)} />
              </div>
              <p className="hint">{t.searchHint}</p>
            </div>
            {/* Listings */}
            <div className="lst-hdr">
              <h2>{t.listingsTitle}</h2>
              <span className="cnt">{t.nCount(filtered.length)}</span>
            </div>
            <div className="chips">
              {["All","Land","House","Plot","Sold"].map(k=>(
                <button key={k} className={`chip${filter===k?" active":""}${k==="Sold"?" sold-chip":""}`} onClick={()=>setFilter(k)}>
                  {k==="All"?t.filterAll:k==="Land"?t.filterLand:k==="House"?t.filterHouse:k==="Plot"?t.filterPlot:t.filterSold}
                </button>
              ))}
            </div>
            {loading ? <div className="loading">⏳ {t.loading}</div>
            : filtered.length===0 ? <div className="empty">{t.noListings}</div>
            : (
              <div className="grid">
                {filtered.map((l,i)=>{
                  const isOwner = currentUser?.mobile===l.ownerMobile;
                  const canToggleSold = isOwner||admin;
                  return (
                    <article className={`card${l.sold?" sold-card":""}`} key={l.id} style={{animationDelay:`${Math.min(i,8)*.04}s`}}>
                      {l.sold&&<div className="sold-ribbon">{t.soldBadge}</div>}
                      <img className="card-img" src={l.image||PLACEHOLDER_SVG} alt={l.title} loading="lazy" />
                      <div className="card-body">
                        <div className="card-top">
                          <span className={`type-badge${l.sold?" sold":""} ${l.type}`}>{l.sold?t.soldBadge:l.type}</span>
                        </div>
                        <h3>{l.title}</h3>
                        <p className={`card-price${l.sold?" sold-price":""}`}>{fmt(l.price)}</p>
                        <p className="card-loc">📍 {l.location}</p>
                        {l.desc&&<p className="card-desc">{l.desc}</p>}
                        {l.sold&&l.soldDate&&<div className="sold-info">✅ {t.soldOn} {l.soldDate}</div>}
                        {admin&&l.gps&&(
                          <div className="card-gps">
                            📍 GPS: <a href={`https://maps.google.com/?q=${l.gps.lat},${l.gps.lng}`} target="_blank" rel="noreferrer" style={{color:"var(--blue)",fontWeight:700}}>
                              {l.gps.lat.toFixed(4)}, {l.gps.lng.toFixed(4)} ↗
                            </a>
                          </div>
                        )}
                        <div className="card-contact">
                          {admin
                            ? <>{t.contactCall} <a href={`tel:${l.contact}`}>{l.contact}</a></>
                            : t.contactHidden}
                        </div>
                        {l.date&&<p className="card-date">Posted: {l.date}</p>}
                      </div>
                      <div className="card-actions">
                        <button className="btn btn-wa" onClick={()=>window.open(`https://wa.me/?text=${encodeURIComponent(waText(l))}`,"_blank")}>
                          📲 {t.waShare}
                        </button>
                        <button className="btn btn-qr" onClick={()=>setQrListing(l)}>▦ {t.qrBtn}</button>
                        {canToggleSold&&(
                          <button className={`btn ${l.sold?"btn-avail":"btn-sold"}`} onClick={()=>toggleSold(l)}>
                            {l.sold?`✅ ${t.markAvailable}`:`🏷️ ${t.markSold}`}
                          </button>
                        )}
                        {admin&&(
                          <button className="btn btn-danger" onClick={()=>deleteListing(l.id)}>{t.deleteBtn}</button>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>

      {/* ── BOTTOM NAV ── */}
      <nav className="bnav">
        <button className={`bnav-btn${tab==="listings"?" active":""}`} onClick={()=>setTab("listings")}>
          <span className="icon">🏠</span><span>{t.navListings}</span>
        </button>
        <button className={`bnav-btn${tab==="post"?" active":""}`} onClick={()=>setTab("post")}>
          <span className="icon">➕</span><span>{t.navPost}</span>
        </button>
        <button className={`bnav-btn${tab==="inbox"?" active":""}`} onClick={()=>setTab(currentUser?"inbox":"login")}>
          <span className="icon">📬</span>
          {unreadCount>0&&<span className="bnav-badge">{unreadCount}</span>}
          <span>{t.navInbox}</span>
        </button>
        <button className={`bnav-btn${tab==="login"?" active":""}`} onClick={()=>setTab("login")}>
          <span className="icon">{currentUser?"👤":"🔑"}</span>
          <span>{currentUser?currentUser.name.split(" ")[0]:t.navLogin}</span>
        </button>
      </nav>
    </>
  );
}
