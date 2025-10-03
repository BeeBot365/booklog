# BookApp
En bokapp där man kan söka böcker från googles bok api och spara de man vill läsa till sitt egna "bibliotet".
I framtiden ska det också gå att logga böckerna man läser så man ser sina framsteg med en bok.
Finns även en funktion för att få läspåminnelser varje dag.

## 4 utvalda RN-komponeter använda i projektet.
* Flatlist, för att lätt kunna rendera listor.
* Image, för att visa bilder.
* Switch, för enkelt kunna toggla av och på läspåminnelser.
* Modal, även där för att fråga om man vill lägga till läspåminnelse.

## 4 utvalda Expo-komponenter.
* SQLite, för att kunna spara böcker/data i appen.
* SecureStore, även där för att spara data men i enklare form.
* WebBrowser, för att prata med webläsaren och öppna mer info om en bok.
* Router, enkelt navigera mellan skärmar.

## Kravlista
Projektet använder minst 4 stycken RN-komponenter och 4 stycken Expo-komponter[x]
De utvalda komponenterna MÅSTE antecknas i README filen tillsammans med en
lista över genomförda krav.[x]
React Navigation används för att skapa en bättre upplevelse i appen.[x]
Git & GitHub har använts[x]
Projektmappen innehåller en README.md fil [x]
Uppgiften lämnas in i tid![x]
Muntlig presentation är genomförd[x]


## Setup
1. Installera beroenden med:  npm install
2. Lägg til en `.env`-fil i projektroten med följande innehåll:
EXPO_PUBLIC_GOOGLE_BOOKS_API_KEY="DIN_API_KEY_HÄR"
Fråga mig om api nyckel eller skapa en i google cloud för att prata med google books apiet.
3. Kör igång projektet med npm run start.
