# Memvid Frontend

Questa è l'applicazione frontend, costruita con [React](https://react.dev/) e [Vite](https://vitejs.dev/), per l'interfaccia utente di **Memvid API**. Permette agli utenti di creare, gestire e interagire con le memorie documentali fornite dal backend.

## Tecnologie Utilizzate

* **React**: Per la costruzione dell'interfaccia utente.
* **Vite**: Per un ambiente di sviluppo veloce e un processo di build ottimizzato.
* **Fetch API**: Per la comunicazione con il backend.
* **CSS**: Stili puliti e moderni senza librerie esterne.

## Guida all'Installazione e Configurazione Locale

### 1. Prerequisiti
Assicurati di avere [Node.js](https://nodejs.org/) (versione 18 o superiore) installato sul tuo sistema.

### 2. Setup del Progetto
```bash
# Clona il repository
git clone <URL_DEL_TUO_REPO_FRONTEND>
cd memvid-fe

# Installa tutte le dipendenze definite nel package.json
npm install
```

### 3. Configurazione dell'Ambiente
L'applicazione ha bisogno di sapere dove si trova l'API backend.

1.  Crea un file chiamato `.env.local` nella cartella principale del progetto.
2.  Aggiungi la seguente riga al file, sostituendo l'URL se necessario:
    ```
    VITE_API_BASE_URL=[http://127.0.0.1:8001/api](http://127.0.0.1:8001/api)
    ```
Questo file è ignorato da Git, quindi le tue configurazioni locali non verranno condivise.

### 4. Avvio in Modalità Sviluppo
Assicurati che il server backend sia in esecuzione, poi lancia il server di sviluppo del frontend:
```bash
npm run dev
```
L'applicazione sarà visibile all'indirizzo **[http://localhost:5173](http://localhost:5173)**.

## Script Disponibili

* `npm run dev`: Avvia l'applicazione in modalità sviluppo con hot-reload.
* `npm run build`: Crea la versione ottimizzata per la produzione nella cartella `dist`.
* `npm run preview`: Avvia un server locale per visualizzare la build di produzione.

## Deployment in Produzione (Vercel)

Questo progetto è ottimizzato per un deploy "zero-config" su **Vercel**.

1.  Fai il push del tuo codice su un repository GitHub.
2.  Crea un account su [Vercel](https://vercel.com) e collegalo al tuo GitHub.
3.  Importa il repository del progetto su Vercel. Le impostazioni di build verranno rilevate automaticamente.
4.  Nella dashboard del progetto su Vercel, vai su `Settings > Environment Variables` e aggiungi la variabile per l'API di produzione:
    * **Key:** `VITE_API_BASE_URL`
    * **Value:** `https://tua-api-di-produzione.onrender.com/api`
5.  Fai un nuovo deploy. Vercel userà questa variabile per collegare il frontend live al backend live.