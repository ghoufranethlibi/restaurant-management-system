# Gestion Restaurant - Backend

Application Spring Boot pour la gestion de restaurant avec MongoDB.

## Prérequis

1. **Java 17** (ou supérieur)
   - Vérifier: `java -version`

2. **Maven**
   - Vérifier: `mvn -version`
   - Ou utiliser le wrapper Maven inclus (`mvnw` ou `mvnw.cmd`)

3. **MongoDB**
   - Installer MongoDB et démarrer le service
   - Par défaut, MongoDB écoute sur `localhost:27017`

## Configuration MongoDB

L'application est configurée pour se connecter à MongoDB avec:
- URI: `mongodb://localhost:27017/gestion_restaurant`
- Base de données: `gestion_restaurant`

### Démarrer MongoDB

**Windows:**
```bash
# Si MongoDB est installé comme service (démarre automatiquement)
# Sinon, démarrer manuellement:
mongod
```

**Linux/Mac:**
```bash
sudo systemctl start mongod
# ou
mongod
```

## Lancer l'Application

### Option 1: Utiliser Maven Wrapper (Recommandé)

**Windows:**
```bash
.\mvnw.cmd spring-boot:run
```

**Linux/Mac:**
```bash
./mvnw spring-boot:run
```

### Option 2: Utiliser Maven (si installé)

```bash
mvn spring-boot:run
```

### Option 3: Compiler et exécuter le JAR

```bash
# Compiler
mvn clean package

# Exécuter
java -jar target/Gestion_Restaurant-0.0.1-SNAPSHOT.jar
```

### Option 4: Exécuter depuis un IDE

1. Ouvrir le projet dans IntelliJ IDEA ou Eclipse
2. Localiser `GestionRestaurantApplication.java`
3. Clic droit → Run 'GestionRestaurantApplication'

## Vérifier que l'Application Fonctionne

Une fois lancée, l'application sera accessible sur:
- **Port par défaut:** `http://localhost:8080`
- **API REST:** Les endpoints seront disponibles sous `/api/...` (selon vos controllers)

### Tester avec curl

```bash
# Vérifier que l'application répond
curl http://localhost:8080
```

## Configuration (application.properties)

```properties
spring.application.name=Gestion_Restaurant
spring.data.mongodb.uri=mongodb://localhost:27017/gestion_restaurant
```

Pour changer le port, ajouter dans `application.properties`:
```properties
server.port=8080
```

## Dépannage

### Erreur: MongoDB non accessible
```
Error: Unable to connect to MongoDB
```
**Solution:** Vérifier que MongoDB est démarré: `mongod`

### Erreur: Port déjà utilisé
```
Error: Port 8080 is already in use
```
**Solution:** Changer le port dans `application.properties`:
```properties
server.port=8081
```

### Erreur: Java version
```
Error: Unsupported class file major version
```
**Solution:** Utiliser Java 17 ou supérieur

## Structure du Projet

```
src/main/java/com/example/Gestion_Restaurant/
├── Controller/      # Contrôleurs REST
├── Models/          # Entités MongoDB
├── Repository/      # Repositories Spring Data
├── Service/         # Services métier
└── GestionRestaurantApplication.java
```

