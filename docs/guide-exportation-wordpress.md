
# Guide d'exportation vers WordPress

Ce guide vous explique comment exporter vos contenus depuis notre plateforme BkoTube vers WordPress.

## Prérequis

- Un site WordPress existant avec les droits d'administration
- Le plugin "Advanced Custom Fields" installé sur votre WordPress
- Le plugin "Custom Post Type UI" (optionnel mais recommandé)

## Étapes d'exportation

### 1. Préparation de WordPress

1. Connectez-vous à votre dashboard WordPress
2. Installez et activez les plugins nécessaires :
   - Advanced Custom Fields (ACF)
   - Custom Post Type UI (CPTUI)

### 2. Création des types de contenus personnalisés

Si vous utilisez CPTUI, créez les types de contenus suivants :

- **Artiste** : pour stocker les informations sur vos artistes
- **Média** : pour stocker les contenus média (audio, vidéo, etc.)
- **Catégorie** : si vous souhaitez des catégories personnalisées en plus de celles par défaut

### 3. Configuration des champs personnalisés avec ACF

Créez des groupes de champs pour chaque type de contenu :

#### Pour les Artistes
- Nom
- Biographie
- Photo
- Réseaux sociaux (URL)
- Informations de contact

#### Pour les Médias
- Titre
- Description
- URL de l'image de couverture
- Artiste associé (relation)
- Catégorie
- Fichier média (audio/vidéo)
- Mise en avant (oui/non)

### 4. Exportation depuis BkoTube

1. Connectez-vous à votre compte BkoTube
2. Accédez à votre tableau de bord
3. Sélectionnez "Exportation" dans le menu
4. Choisissez "Format WordPress" dans les options d'exportation
5. Sélectionnez les contenus à exporter
6. Cliquez sur "Exporter" et téléchargez le fichier XML

### 5. Importation dans WordPress

1. Dans votre dashboard WordPress, allez à "Outils" > "Importer"
2. Choisissez "WordPress" dans la liste des importateurs
3. Sélectionnez le fichier XML téléchargé
4. Suivez les instructions pour importer vos contenus

### 6. Vérification et ajustements

Après l'importation :
1. Vérifiez que tous vos contenus sont correctement importés
2. Ajustez les permaliens si nécessaire
3. Vérifiez les images et médias associés
4. Testez les relations entre les contenus

## Assistance technique

Si vous rencontrez des difficultés lors de l'exportation ou l'importation, n'hésitez pas à contacter notre équipe de support technique :

- Email : support@bkotube.com
- Téléphone : +223 XX XX XX XX

## Limitations connues

- Certains éléments de mise en forme complexes peuvent nécessiter des ajustements manuels
- Les permissions utilisateurs devront être reconfigurées dans WordPress
- Les statistiques et données d'utilisation ne sont pas exportées
