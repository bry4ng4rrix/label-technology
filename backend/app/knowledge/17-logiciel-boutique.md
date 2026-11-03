---
code: "17"
titre: Logiciel de gestion de boutique, stock et caisse
a_completer: false
---
Application web de gestion de stock, de ventes et de caisse pour une entreprise
à un ou plusieurs magasins. Utilisable sur ordinateur et sur téléphone. Déjà en
service chez une enseigne de prêt-à-porter et cosmétique à Madagascar (ne pas
citer de nom). Démo possible ; prix communiqué par l'équipe.

## Trois rôles
- **Admin** (le dirigeant) : voit tous les magasins, gère les produits, les
  prix, les utilisateurs, les transferts, les rapports et les sauvegardes.
- **Gérant de magasin** : vend, encaisse, ajoute du stock, suit son magasin ;
  ne modifie ni les prix ni les fiches produit.
- **Employé / vendeur** : vend et encaisse, sans accès aux réglages ni aux
  rapports.
Le prix d'achat et les bénéfices globaux ne sont visibles que par l'admin.
Plusieurs administrateurs possibles (co-administrateurs). Les comptes créés par
inscription sont validés par un responsable avant de pouvoir se connecter.

## Produits et stock
- Fiche produit : référence, nom, marque, catégorie, description, prix d'achat
  et prix de vente en Ariary, seuil d'alerte, date de péremption, jusqu'à 3
  photos.
- **Variantes taille × couleur** avec quantité par variante (tailles XS à 4XL).
- **QR code** généré automatiquement pour chaque produit ; recherche rapide et
  scan du QR avec la caméra du téléphone, avec vente directe depuis le résultat.
- Import et export du catalogue en **Excel**.
- Transferts de produits entre magasins (admin), avec contrôle du stock.
- Historique complet des mouvements (entrées, sorties, ventes, transferts),
  filtrable et exportable en Excel ; produits les plus vendus et produits sans
  mouvement.
- Alertes : rupture, stock faible (seuil propre à chaque produit), produits
  expirés ou qui expirent sous 30 jours, mises à jour en temps réel.

## Ventes et caisse
- Vente d'un ou plusieurs articles en une transaction, avec contrôle du stock
  disponible (vente bloquée si le stock est insuffisant).
- Remise en pourcentage (admin), nom du client.
- **Ventes à crédit** : montant versé, échéance, alerte de retard de paiement.
- Ticket de caisse imprimable et réimprimable.
- Caisse : ouverture avec fond de caisse, entrées et sorties d'espèces avec
  motif, fermeture avec montant compté et calcul de l'écart, historique des
  sessions.

## Pilotage
- Tableau de bord adapté au rôle : chiffre d'affaires, bénéfice, valeur du
  stock, ventes du jour, alertes.
- Rapports sur 7, 30 ou 90 jours : chiffre d'affaires, bénéfice net, unités
  vendues, ventes impayées, top 10 des produits, performance des vendeurs et des
  magasins.
- Analyse rédigée par IA à la demande (meilleures ventes, stocks dormants,
  produits proches de la péremption).

## Équipe et assistant
- Messagerie interne en temps réel : salon général et messages privés, avec
  partage d'une fiche produit dans la conversation.
- Notifications en temps réel.
- **Assistant IA** intégré : répond aux questions sur le stock et les ventes ;
  pour l'admin et le gérant, il peut aussi ajuster un stock, changer un prix ou
  transférer un produit, toujours après confirmation.

## Sécurité et abonnement
- Sauvegarde complète téléchargeable (produits, ventes, utilisateurs, images)
  et restauration.
- Fonctionne par abonnement par entreprise, avec un nombre d'appareils connectés
  inclus selon la formule. Une période d'essai est prévue ; durée, formules et
  prix sont confirmés par l'équipe.
- Paiement de l'abonnement envisagé par MVola ou carte : modalités confirmées
  par l'équipe.

## À ne pas promettre
- Vente en ligne (boutique e-commerce), lecteur de code-barres classique,
  paiement Mobile Money à la caisse, fonctionnement hors connexion : non
  présents dans le logiciel actuel, faisabilité à confirmer par l'équipe.
- Les catégories de produits sont aujourd'hui orientées mode et cosmétique ;
  l'adaptation à un autre commerce est à confirmer par l'équipe.

Qualification : type de commerce ; nombre de boutiques ; nombre d'articles et de
références ; produits avec tailles et couleurs ; nombre de vendeurs ; ventes à
crédit ; outil actuel (cahier, Excel, autre logiciel) ; besoin de vente en
ligne.
