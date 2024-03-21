# UGuest

Description brève du projet.

## Prérequis

- Node.js 
- MongoDB
- Git

## Installation

1. Clonez ce référentiel sur votre machine locale :

   ```bash
   git clone https://github.com/malik-uguest/UGuest.git

Accédez au répertoire du projet :

cd front && cd back (le Backend est hebergé mais peu utilisé en local)

Installez les dépendances du projet en utilisant npm (Node Package Manager) :

npm install

## Utilisation

1. **Pour construire le projet pour la production, exécutez :**

npx expo start (si le front et le serveur tourne sur le meme reseau) ou npx expo start --tunnel (si le front et le back tourne sur des reseaux different) ou utilisez android studio 

Le serveur sera accessible à l'adresse http://en local 
Le serveur sera accessible à l'adresse 'http://' si le back est hebergé
variable DATABASE_URL a modifier dans le fichier config.js

2. **Pour démarrer le serveur de développement, exécutez :**

- serveur distant :

    via un FTP ouvrez une connexion SSH vers votre serveur distant en utilisant un terminal ou un client SSH.
    Une fois connecté au serveur, exécutez la commande suivante pour vérifier si Node.js est déjà installé : node -v
    si c'est le cas executer la commande suivante: node index.js.
    sinon contacter l'hebergeur 

- serveur local :

    commande : npm start (ou nodemon index.js)

3. **Connexion à la Base de Données**

   Assurez-vous que le fichier `.env` est bien présent dans le répertoire racine du projet, et vérifiez que la variable `MONGO_URL` est correctement définie. La variable `MONGO_URL` doit inclure les identifiants suivants :

   - **Identifiant** : 
   - **Mot de passe** : 

   Pour accéder à la base de données en ligne et effectuer des consultations ou des modifications, suivez les étapes ci-dessous :

   Connectez-vous sur MongoDB Atlas en utilisant les identifiants suivants :
      - **Email** : 
      - **Mot de passe** : 

   Avec ces informations de connexion, vous pourrez accéder à votre base de données MongoDB Atlas.


4. **Structure du Projet**

Le projet est organisé en deux parties distinctes : le front-end et le back-end.

## Structure du Front-end

Le front-end est construit en utilisant [nom du framework ou de la bibliothèque] et suit une structure de dossier standard. Voici un aperçu de la structure du front-end :

- `/public` : Ce répertoire contient les fichiers statiques tels que les images, les polices, etc.
- `/src` : Le code source du front-end est situé ici.
  - `/component` : Contient tous les composants réutilisables de l'application.
  - `/screen` : Chaque page de l'application a son propre répertoire ici.
  - `/config` : Les information de connection au back-end sont stockés ici.
  - `/context` : Les fichiers liés à la gestion de l'état global de l'application.
  - `/assets` : Les differentes ressource img et video.

## Structure du Back-end

Le back-end est développé en utilisant Node.js, Express.js, et MongoDB comme base de données. Voici un aperçu de la structure du back-end :

- `/controllers` : Les contrôleurs gèrent la logique métier de l'application.
- `/models` : Les modèles décrivent la structure des données stockées dans la base de données MongoDB.
- `/routes` : Les routes définissent les points de terminaison API et spécifient les contrôleurs à utiliser.
- `index.js` : les differentes configuration du serveur.
- `/.env` : Les fichiers de configuration, tels que les variables d'environnement, sont stockés ici.

## Fonctionnement

- **Modèles (Models)** : Les modèles définissent la structure des données stockées dans la base de données. Ils sont généralement utilisés pour interagir avec la base de données.

- **Contrôleurs (Controllers)** : Les contrôleurs gèrent la logique métier de l'application. Ils traitent les demandes des clients, effectuent des opérations sur les modèles et renvoient des réponses.

- **Routes (Routes)** : Les routes définissent les points de terminaison API et spécifient les contrôleurs à utiliser pour chaque route.

- **Services (Services)** : Les services encapsulent la logique métier réutilisable ou les opérations complexes et peuvent être appelés à partir des contrôleurs.

N'hésitez pas à explorer les répertoires et fichiers correspondants pour obtenir plus de détails sur chaque composant du projet.


