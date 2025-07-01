// ============================================================
// Nom du fichier : ego_bot.js
// Auteur : Supremus Prod
//
// Description : Ce fichier contient les fonctions et les logiques
//               liées à la communauté Shinobis Storm par Supremus Prod.
//
// Date de création : 01/07/2025
// Dernière modification : 01/07/2025
//
// ============================================================

const { zokou } = require('../framework/zokou');
const { addOrUpdateDataInPlayer, getDataFromPlayer } = require('../bdd/ego_db');

// ➤ Utilitaire pour envoyer une image avec légende
async function envoyerImage(dest, zk, ms, lien, caption = '') {
    await zk.sendMessage(dest, { image: { url: lien }, caption }, { quoted: ms });
}

// ➤ Fonction pour créer dynamiquement des commandes `playerX`
function createPlayerCommand(playerName) {
    zokou({
        nomCom: playerName,
        categorie: 'EGO_BOT'
    }, async (dest, zk, commandeOptions) => {

        const { ms, arg, repondre, superUser } = commandeOptions;

        try {
            const data = await getDataFromPlayer(playerName);

            if (!arg || !arg[0] || arg.join('') === '') {
                // Affichage des données existantes
                if (data) {
                    const { message, lien } = data;
                    const alivemsg = `${message}`;

                    if (/\.(mp4|gif)$/i.test(lien)) {
                        await zk.sendMessage(dest, { video: { url: lien }, caption: alivemsg }, { quoted: ms });
                    } else if (/\.(jpeg|png|jpg)$/i.test(lien)) {
                        await zk.sendMessage(dest, { image: { url: lien }, caption: alivemsg }, { quoted: ms });
                    } else {
                        repondre(alivemsg);
                    }

                } else {
                    const baseMsg = `🔃 Aucune fiche trouvée pour ce joueur. Pour l'enregistrer, entrez après la commande votre message et votre lien d'image ou vidéo dans ce format : -${playerName} Message;Lien\n⚠️ Attention aux infos que vous tapez.`;
                    superUser ? repondre(baseMsg) : repondre("🛃 Aucune fiche trouvée pour ce joueur.");
                }

            } else {
                // Mise à jour des données
                if (!superUser) return repondre("🛂 Réservé aux membres de la *DRPS*");

                const [texte, tlien] = arg.join(' ').split(';');

                if (texte && tlien) {
                    await addOrUpdateDataInPlayer(playerName, texte.trim(), tlien.trim());
                    repondre('✔️ Données actualisées avec succès');
                } else {
                    repondre(`❌ Format incorrect. Veuillez utiliser : -${playerName} Message;Lien`);
                }
            }

        } catch (error) {
            console.error("Erreur lors du traitement de la commande :", error);
            repondre("🥵 Une erreur est survenue. Veuillez réessayer plus tard.");
        }
    });
}

// ➤ Création de commandes dynamiques (ajoute autant de joueurs que tu veux ici)
['player1', 'player2'].forEach(player => createPlayerCommand(player));

// ➤ Commande des règles Shinobi Storm
zokou(
    { nomCom: 'rules', categorie: 'EGO_BOT' },
    async (dest, zk, { ms }) => {
        const liens = [
            'https://i.ibb.co/0pjDhrH9/image.jpg',
            'https://i.ibb.co/WvXbc9rS/image.jpg',
            'https://i.ibb.co/Cs9KB2V2/image.jpg'
        ];
        for (const lien of liens) {
            await envoyerImage(dest, zk, ms, lien);
        }
    }
);

// ➤ Menu principal EGO_BOT
zokou(
    { nomCom: 'ego_menu', categorie: 'EGO_BOT' },
    async (dest, zk, { ms }) => {
        const lien = 'https://i.ibb.co/9FpTTgz/image.jpg';
        const msg = `┏━━━━━━━━━━━━━━━━━◇
┃          *EGO_BOT_MENU*
┣━━━━━━━━━━━━━━━━━◇
┃ #ego_menu
┃ #rules
┃ #pave
┃ #verdict
┃ # *Version* : 3.1.0
┗━━━━━━━━━━━━━━━━━◇`;
        await envoyerImage(dest, zk, ms, lien, msg);
    }
);

// ➤ Verdict d’un match classé
zokou(
    { nomCom: 'verdict', categorie: 'EGO_BOT' },
    async (dest, zk, { arg, repondre }) => {
        if (!arg || arg.length === 0) {
            const msg = `*🎮VERDICT DUEL CLASSÉ🔶*
▔▔▔▔▔▔▔▔▔▔▔▔▔░▒▒▒▒░░▒░
*ReSumé🎙️:*
———————————————
*MODO⚖️:*
*ARENE🏟️:*
*MOT DE FIN:💬*
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔░▒▒▒▒░░▒░
> 🎮SHINOBI STORM RP🔶`;
            repondre(msg);
        }
    }
);

// ➤ Pavé d’introduction RP
zokou(
    { nomCom: 'pave', categorie: 'EGO_BOT' },
    async (dest, zk, { arg, repondre }) => {
        if (!arg || arg.length === 0) {
            const msg = `> 🔶EGOTYPE PAVÉ RP🎮
▔▔▔▔▔░▒▒▒▒░░▒░░▒
*💬Mots:*
———————————————
              *🎮ACTIONS🎮*
> 👊🏼:
———————————————
> 🔶SHINOBI STORM RP🎮
░▒▒▒▒░░▒░░▒▒░░▒`;
            repondre(msg);
        }
    }
);

// ➤ Fiche de joueur (template statique)
zokou(
    { nomCom: 'fiche', categorie: 'EGO_BOT' },
    async (dest, zk, { arg, repondre }) => {
        if (!arg || arg.length === 0) {
            const msg = `*_▢▩▢▩▢▩▢▩▢▩▢▩▢▩▢▩▢▩▢▩▢▩_*
*_🔶SHINOBI STORM RP🎮_*
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
*🥇Fiche Shinobi Ultimate League🏆*
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
_▲Pseudo👤:_
_▲DIVISION⚪️: *Alpha⚪️*_
_▲BOURSE💰: *00🔶*_
_▲STARS⭐️ : *00⭐️*_
_▲Card de Réduction 🎟: *0 🎟_*
▱▰▱▰▱▰▱▰▱▰▱▰▱▰▱▰
*_🔢Records_*: 
_00 Victoires🏆 / 00 Défaite😭_
_*🏆 Points*: 00🌟_ 
_RANG *SUL🏅*: 23ème_
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
*_🛍🛒ACHATS CARDS:_*
▱▰▱▰▱▰▱▰▱▰▱▰▱▰▱▰
*_▢▩▢▩▢▩▢▩▢▩▢▩▢▩▢▩▢▩▢▩▢▩_*`;
            repondre(msg);
        }
    }
);
