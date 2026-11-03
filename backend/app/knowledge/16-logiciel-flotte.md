---
code: "16"
titre: Logiciel de gestion de flotte et d'engins (ParcAuto)
a_completer: false
---
Logiciel de gestion de parc roulant : véhicules routiers et engins de chantier,
conducteurs, missions, chantiers et coûts. Il se compose d'une application web
(bureau, direction, atelier) et de deux applications mobiles : une pour les
conducteurs, une pour les mécaniciens de l'atelier. Démo possible ; prix
communiqué par l'équipe.

## Le parc
- Fiche par véhicule : caractéristiques, compteurs, documents, photos,
  équipements de bord.
- Engins suivis en **heures moteur**, véhicules routiers en **kilomètres** :
  consommation et coût d'usage calculés selon le bon compteur.
- Missions, affectation des conducteurs, pleins de carburant, maintenances,
  incidents, documents à échéance, échéancier d'entretien.

## Les chantiers
- Un chantier regroupe véhicules et conducteurs sur une période datée. Un engin
  ne peut pas être sur un chantier et en mission en même temps.
- Avec des boîtiers GPS, la présence réelle de chaque engin sur son chantier est
  calculée automatiquement chaque nuit : l'écart entre matériel prévu et
  matériel présent apparaît sans saisie.
- État des lieux avec photos à l'arrivée et au départ du chantier : une
  dégradation est imputée au bon chantier.
- Le chef de chantier fait ses demandes de matériel et tient son journal.

## Le pilotage (pour la direction)
- Coût complet par véhicule et par type : amortissement, loyer, charges,
  carburant, entretien.
- Taux d'utilisation et véhicules sous-utilisés, avec des seuils propres à
  chaque type de véhicule.
- Fiabilité : pannes, immobilisation, respect des échéances.
- Score de conduite mensuel par conducteur (à partir des boîtiers GPS).
- Budget carburant réel comparé au prévisionnel, avec la cause probable de
  l'écart.
- Renouvellement du parc, cessions, prévision des dépenses sur 12 mois.
- Sinistres : dossier assureur, responsabilité, reste à charge.
- 19 types de rapports, exportables en PDF et Excel, envoyables
  automatiquement par email.

## La conformité
- Une mission est **bloquée** si les documents du véhicule ne sont pas valides
  (au minimum assurance et visite technique) ou si le conducteur n'a pas la
  qualification requise (permis pour un véhicule, CACES pour un engin).
- Surveillance de la fatigue au volant ; journal des connexions.

## Les applications mobiles
- Conducteur : son véhicule, ses missions, déclaration de plein (complet,
  appoint, bidon) et d'incident avec photos, depuis le terrain.
- Atelier : maintenances, pièces, photos avant/pendant/après.
- Pensées pour un réseau instable : une action renvoyée plusieurs fois n'est
  enregistrée qu'une seule fois.

## Échanges et alertes
- Messagerie interne : messages privés, canaux d'équipe, et discussions
  rattachées à un véhicule, une mission, un chantier ou une maintenance.
- Alertes sur les anomalies, qui remontent d'un niveau tant qu'elles ne sont pas
  traitées ; les alertes critiques peuvent être transmises à un autre système.
- Mises à jour en temps réel à l'écran.

## Rôles
Directeur général, responsable de parc, assistant de parc, chef de maintenance,
assistant de maintenance, chef de chantier, conducteur, comptable (lecture et
export comptable), administrateur informatique. Chacun ne voit que ce qui le
concerne.

## À ne pas promettre
- La fourniture et la pose des boîtiers GPS, et la compatibilité avec des
  boîtiers déjà installés : l'équipe confirme.
- Le fonctionnement complètement hors connexion : non annoncé.
- Le plan comptable des exports : basé sur le PCG 2005 malgache, adaptable ;
  à valider avec le comptable du client.

Qualification : nombre de véhicules et d'engins ; nombre de chantiers ou sites ;
nombre d'utilisateurs et de conducteurs ; outil actuel (Excel, papier, autre
logiciel) ; boîtiers GPS déjà installés ou non ; besoin des applications
mobiles ; indicateurs prioritaires (coûts, carburant, disponibilité) ; délai
souhaité.
