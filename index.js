require('dotenv/config');
const { Client, IntentsBitField, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { CommandHandler } = require('djs-commander');
const path = require('path');

const client = new Client({
  intents: [IntentsBitField.Flags.Guilds],
});

new CommandHandler({
  client,
  commandsPath: path.join(__dirname, 'slash-commands'),
  eventsPath: path.join(__dirname, 'events'),
});

client.on("ready", async () => {
  console.log("The bot loaded successfully.");
  askSet();
  channelSuggestion();
});

client.on("interactionCreate", (interaction) => {
  if (interaction.customId === "suggestion-modal") {
    makeModalSuggestion(interaction);
  } else if  (interaction.customId === "request-set-modal") {
    modalSet(interaction);
  } else if (interaction.customId && interaction.customId.startsWith("suggestion-modal-")) {
    submitModalSuggestion(interaction);
  } else if (interaction.customId && interaction.customId.startsWith("requestSetModal-")) {
    submitModalSet(interaction);
  }
});

function makeModalSuggestion(interaction) {
  const userId = interaction.user.id;
  const modal = new ModalBuilder()
      .setCustomId(`suggestion-modal-${userId}`)
      .setTitle('Faça pedido do set');

  const cityName = new TextInputBuilder()
      .setCustomId('cityName')
      .setLabel("NOME NA CIDADE?")
      .setStyle(TextInputStyle.Short)
      .setRequired(true);
  const suggestion = new TextInputBuilder()
      .setCustomId('suggestion')
      .setLabel("INSIRA SUA SUGESTÂO")
      .setStyle(TextInputStyle.Paragraph)
      .setRequired(true);

  const firstActionRow = new ActionRowBuilder().addComponents(cityName);
  const secondActionRow = new ActionRowBuilder().addComponents(suggestion);
  modal.addComponents(firstActionRow, secondActionRow);

  interaction.showModal(modal);
}

async function submitModalSuggestion(interaction) {
  const userId = interaction.user.id;
  const userMention = interaction.user.toString();
  const filter = (interaction) => interaction.customId === `suggestion-modal-${userId}`;

  try {
    const modalInteraction = await interaction.awaitModalSubmit({filter, time: 120_000});
    const cityNameValue = modalInteraction.fields.getTextInputValue('cityName');
    const suggestionValue = modalInteraction.fields.getTextInputValue('suggestion');
    const embed = createEmbed('Nova sugestão!', `Nome na cidade: ${cityNameValue}\nSugestão: ${suggestionValue}`, userMention);
    sendMessageToChannels(embed, ['997122698905919579', '800849352112734230'], '1194621112764604466');
    modalInteraction.reply({
      ephemeral: true,
      content: `Sua sugestão foi enviada com sucesso, caso seja adicionada te avisaremos.`,
    });
  } catch (err) {
    console.log('Error', err);
  }
}

function modalSet(interaction) {
  const userId = interaction.user.id;
  const modal = new ModalBuilder()
      .setCustomId(`requestSetModal-${userId}`)
      .setTitle('Faça pedido do set');

  const cityName = new TextInputBuilder()
      .setCustomId('cityName')
      .setLabel("NOME NA CIDADE?")
      .setStyle(TextInputStyle.Short)
      .setRequired(true);
  const passport = new TextInputBuilder()
      .setCustomId('passport')
      .setLabel("INSIRA SEU PASSAPORTE")
      .setStyle(TextInputStyle.Short)
      .setRequired(true);
  const cityPhone = new TextInputBuilder()
      .setCustomId('cityPhone')
      .setLabel("TELEFONE NA CIDADE")
      .setStyle(TextInputStyle.Short)
      .setRequired(true);
  const recruiterName = new TextInputBuilder()
      .setCustomId('recruiterName')
      .setLabel("NOME DO RECRUTADOR")
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

  const firstActionRow = new ActionRowBuilder().addComponents(cityName);
  const secondActionRow = new ActionRowBuilder().addComponents(passport);
  const thirdActionRow = new ActionRowBuilder().addComponents(cityPhone);
  const fourActionRow = new ActionRowBuilder().addComponents(recruiterName);
  modal.addComponents(firstActionRow, secondActionRow, thirdActionRow, fourActionRow);

  interaction.showModal(modal);
}

async function submitModalSet(interaction) {
  const userId = interaction.user.id;
  const userMention = interaction.user.toString();
  const filter = (interaction) => interaction.customId === `requestSetModal-${userId}`;

  try {
    const modalInteraction = await interaction.awaitModalSubmit({filter, time: 120_000});
    const cityNameValue = modalInteraction.fields.getTextInputValue('cityName');
    const passportValue = modalInteraction.fields.getTextInputValue('passport');
    const cityPhoneValue = modalInteraction.fields.getTextInputValue('cityPhone');
    const recruiterNameValue = modalInteraction.fields.getTextInputValue('recruiterName');
    const embed = createEmbed('Pedindo set !', `Nome na cidade: ${cityNameValue}\nPassaporte: ${passportValue}\nTelefone na cidade: ${cityPhoneValue}\nNome do recrutador: ${recruiterNameValue}`, userMention);
    sendMessageToChannels(embed, ['997122698905919579', '800849352112734230'], '1194613131763253319');
    modalInteraction.reply({
      ephemeral: true,
      content: `Pedido de set solicitado com sucesso, aguarde alguém da moderação responder.`,
    });
  } catch (err) {
    console.log('Error', err);
  }
}

function createEmbed(title, description, userMention) {
  let descriptionEmbed = `${description}`
  if (userMention) {
    descriptionEmbed = `${description}\nDiscord: ${userMention}`
  }
  return new EmbedBuilder()
      .setTitle(title)
      .setDescription(descriptionEmbed)
      .setColor(0x7289DA);
}

function sendMessageToChannels(embed, userIDs, channelID) {
  const channel = client.channels.cache.get(channelID);
  channel.send({embeds: [embed]});

  userIDs.forEach(async (userID) => {
    const user = await client.users.fetch(userID, false);
    user.send({embeds: [embed]});
  });
}

async function askSet() {
  const channel = await client.channels.fetch("1194358308002345091");
  const messages = await channel.messages.fetch();

  let embed = createEmbed('Seja bem-vindo(a) faça a solicitação do seu set aqui, basta interagir com o botão abaixo e esperar algum superior aprovar!', 'Tropa da Romanov');
  if (messages.size === 0) {
    channel.send({
      components: [
        new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId("request-set-modal")
                .setLabel("Pedir Set")
                .setStyle(ButtonStyle.Secondary)
                .setEmoji({ name: "📄" })
        ),
      ],
      embeds: [embed]
    });
  }
}

async function channelSuggestion() {
  const channel = await client.channels.fetch("1194619056695803934");
  const messages = await channel.messages.fetch();

  let embed = createEmbed('Seja bem-vindo(a) deixe a sua sugestão aqui!', 'Se for uma boa sugestão, iremos implementar, todos são convidados a dar idéia pra nossa tropa continuar crescendo.');
  if (messages.size === 0) {
    channel.send({
      components: [
        new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId("suggestion-modal")
                .setLabel("Sugerir")
                .setStyle(ButtonStyle.Secondary)
                .setEmoji({name: "💡"})
        ),
      ],
      embeds: [embed]
    });
  }
}

client.login(process.env.TOKEN);
