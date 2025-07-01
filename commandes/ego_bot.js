// CODE DU EGO_BOT DE LA COMMU SHINOBIS STORM RP

const { zokou } = require('../framework/zokou');
const { addOrUpdateDataInPlayer, getDataFromPlayer } = require('../bdd/player'); // Adapté pour n'importe quel joueur

// Commande de gestion de profil
zokou(
    {
        nomCom: 'player1',  // Peut être dynamique
        categorie: 'EGO_BOT'
    }, async (dest, zk, commandeOptions) => {

        const { ms, arg, repondre, superUser } = commandeOptions;

        // Déterminez le joueur actuel de manière dynamique si possible
        const playerName = 'player1'; // Peut être dynamique en fonction de la commande

        try {
            // Récupérer les données du joueur
            const data = await getDataFromPlayer(playerName);

            if (!arg || !arg[0] || arg.join('') === '') {
                // Si aucune commande n'est spécifiée, on affiche les données existantes du joueur
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
                    if (!superUser) {
                        repondre("🛃 Aucune fiche trouvée pour ce joueur.");
                    } else {
                        repondre("🔃 Aucune fiche trouvée pour ce joueur. Pour l'enregistrer, entrez après la commande votre message et votre lien d'image ou vidéo dans ce format : -${nomCom} Message;Lien");
                        repondre("⚠️ Attention aux infos que vous tapez.");
                    }
                }
            } else {
                // Si l'utilisateur a fourni des arguments pour mettre à jour les données
                if (!superUser) {
                    repondre("🛂 Réservé aux membres de la *DRPS*");
                } else {
                    const [texte, tlien] = arg.join(' ').split(';');

                    if (texte && tlien) {
                        await addOrUpdateDataInPlayer(playerName, texte, tlien);
                        repondre('✔️ Données actualisées avec succès');
                    } else {
                        repondre("Format incorrect. Veuillez utiliser: -${nomCom} Message;Lien");
                    }
                }
            }
        } catch (error) {
            console.log("Erreur lors du traitement de la commande : " + error);
            repondre("🥵 Une erreur est survenue lors du traitement de votre commande. Veuillez réessayer plus tard.");
        }
    }
);

zokou(
    {
        nomCom: 'player2',  // Peut être dynamique
        categorie: 'EGO_BOT'
    }, async (dest, zk, commandeOptions) => {

        const { ms, arg, repondre, superUser } = commandeOptions;

        // Déterminez le joueur actuel de manière dynamique si possible
        const playerName = 'player2'; // Peut être dynamique en fonction de la commande

        try {
            // Récupérer les données du joueur
            const data = await getDataFromPlayer(playerName);

            if (!arg || !arg[0] || arg.join('') === '') {
                // Si aucune commande n'est spécifiée, on affiche les données existantes du joueur
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
                    if (!superUser) {
                        repondre("🛃 Aucune fiche trouvée pour ce joueur.");
                    } else {
                        repondre("🔃 Aucune fiche trouvée pour ce joueur. Pour l'enregistrer, entrez après la commande votre message et votre lien d'image ou vidéo dans ce format : -${nomCom} Message;Lien");
                        repondre("⚠️ Attention aux infos que vous tapez.");
                    }
                }
            } else {
                // Si l'utilisateur a fourni des arguments pour mettre à jour les données
                if (!superUser) {
                    repondre("🛂 Réservé aux membres de la *DRPS*");
                } else {
                    const [texte, tlien] = arg.join(' ').split(';');

                    if (texte && tlien) {
                        await addOrUpdateDataInPlayer(playerName, texte, tlien);
                        repondre('✔️ Données actualisées avec succès');
                    } else {
                        repondre("Format incorrect. Veuillez utiliser: -${nomCom} Message;Lien");
                    }
                }
            }
        } catch (error) {
            console.log("Erreur lors du traitement de la commande : " + error);
            repondre("🥵 Une erreur est survenue lors du traitement de votre commande. Veuillez réessayer plus tard.");
        }
    }
);

// Commande des règles Shinobi Storm
zokou(
    { nomCom: 'rules', categorie: 'EGO_BOT' },
    async (dest, zk, commandeOptions) => {
        const { ms } = commandeOptions;
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

// Commande du menu Shinobi Storm
zokou(
    { nomCom: 'ego_menu', categorie: 'EGO_BOT' },
    async (dest, zk, commandeOptions) => {
        const { ms } = commandeOptions;
        const lien = 'https://i.ibb.co/9FpTTgz/image.jpg';
        const msg = '┏━━━━━━━━━━━━━━━━━◇
┃          *EGO_BOT_MENU*
┣━━━━━━━━━━━━━━━━━◇
┃ #ego_menu
┃ #rules
┃ #pave
┃ #verdict
┃ # *Version* : 3.1.0
┗━━━━━━━━━━━━━━━━━◇';
        await envoyerImage(dest, zk, ms, lien, msg);
    }
);

// Commande d'annonce match classé
zokou(
    {
        nomCom: 'verdict',
        categorie: 'EGO_BOT'
    },
    async (dest, zk, commandeOptions) => {
        const { repondre, arg, ms } = commandeOptions;

        if (!arg || arg.length === 0)  {
            // const lien = '';
            const msg = `*🎮VERDICT DUEL CLASSÉ🔶*
▔▔▔▔▔▔▔▔▔▔▔▔▔░▒▒▒▒░░▒░
*ReSumé🎙️:*
———————————————
*MODO⚖️:*

*ARENE🏟️*

*MOT DE FIN:💬*
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔░▒▒▒▒░░▒░
> 🎮SHINOBI STORM RP🔶`;
           // zk.sendMessage(dest, { image: { url: lien }, caption: msg }, { quoted: ms });
   repondre(msg);
        }
    }
);

// Commande du pavé Shinobi Storm
zokou(
    {
        nomCom: 'pave',
        categorie: 'EGO_BOT'
    },
    async (dest, zk, commandeOptions) => {
        const { repondre, arg, ms } = commandeOptions;

        if (!arg || arg.length === 0)  {
            // const lien = '';
            const msg = `> 🔶EGOTYPE PAVÉ RP🎮
▔▔▔▔▔░▒▒▒▒░░▒░░▒

*💬Mots:*
———————————————-
              *🎮ACTIONS🎮*
> 👊🏼:

———————————————
> 🔶SHINOBI STORM RP🎮
░▒▒▒▒░░▒░░▒▒░░▒`;
           // zk.sendMessage(dest, { image: { url: lien }, caption: msg }, { quoted: ms });
   repondre(msg);
        }
    }
);

// Commande de profil joueurs
zokou(
    {
        nomCom: 'fiche',
        categorie: 'EGO_BOT'
    },
    async (dest, zk, commandeOptions) => {
        const { repondre, arg, ms } = commandeOptions;

        if (!arg || arg.length === 0)  {
            // const lien = '';
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
░░░░░░░░░░░░░░░░░░░
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
_*🔢Records*:_ 
_00 Victoires🏆/ 00 Défaite😭_
_*🏆 Points*: 00🌟_ 

_RANG *SUL🏅*: 23ème_
▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
*_🛍🛒ACHATS CARDS: _*
▱▰▱▰▱▰▱▰▱▰▱▰▱▰▱▰
*_▢▩▢▩▢▩▢▩▢▩▢▩▢▩▢▩▢▩▢▩▢▩_*`;
           // zk.sendMessage(dest, { image: { url: lien }, caption: msg }, { quoted: ms });
   repondre(msg);
        }
    }
);

