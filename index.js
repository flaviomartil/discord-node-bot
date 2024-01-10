require('dotenv/config');
const { Client, IntentsBitField, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, EmbedBuilder,
  ButtonBuilder,
  ButtonStyle
} = require('discord.js');
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
  console.log("O bot carregou com sucesso.");
  askSet();
  channelSuggestion();
});

client.on("interactionCreate", (interaction) => {
  modalSet(interaction);
  modalSuggestion(interaction);
});

function modalSuggestion(interaction) {
  if (interaction.customId === "sugestao-modal") {
    const modal = new ModalBuilder()
        .setCustomId(`sugestao-modal-${interaction.user.id}`)
        .setTitle('Faça pedido do set')
    ;

    const nomeNaCidade = new TextInputBuilder()
        .setCustomId('nomeNaCidade')
        .setLabel("NOME NA CIDADE?")
        .setStyle(TextInputStyle.Short)
        .setRequired(true);
    const sugestao = new TextInputBuilder()
        .setCustomId('sugestao')
        .setLabel("INSIRA SUA SUGESTÂO")
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(true);


    const firstActionRow = new ActionRowBuilder().addComponents(nomeNaCidade);
    const secondActionRow = new ActionRowBuilder().addComponents(sugestao);
    modal.addComponents(firstActionRow, secondActionRow);

    interaction.showModal(modal);
    return;
  }

  if (interaction.customId.startsWith("sugestao-modal-")) {
    const filter = (interaction) => interaction.customId === `sugestao-modal-${interaction.user.id}`;
    interaction
        .awaitModalSubmit({filter, time: 30_000})
        .then((modalInteraction) => {
          const nomeNaCidadeValue = modalInteraction.fields.getTextInputValue('nomeNaCidade');
          const sugestaoValue = modalInteraction.fields.getTextInputValue('sugestao');
          let embed = new EmbedBuilder()
              .setTitle('Nova sugestão !')
              .setDescription(`
        Nome na cidade: ${nomeNaCidadeValue}
        Sugestão: ${sugestaoValue}
    `).setColor(0x7289DA);

          const channel = client.channels.cache.get('1194621112764604466')
          channel.send({embeds: [embed]})

          client.users.fetch('997122698905919579', false).then((user) => {
            user.send({ embeds: [embed] });
          });

          client.users.fetch('800849352112734230', false).then((user) => {
            user.send({ embeds: [embed] });
          });

        }).catch((err) => {
      console.log('Error' + err);
    })
    interaction.reply({
      ephemeral: true,
      content: `Sua sugestão foi enviada com sucesso, caso seja adicionada te avisaremos.`,
    });
  }
}
function modalSet(interaction) {
  if (interaction.customId === "pedir-set-modal") {
    const modal = new ModalBuilder()
        .setCustomId(`pedirSetModal-${interaction.user.id}`)
        .setTitle('Faça pedido do set')
    ;

    const nomeNaCidade = new TextInputBuilder()
        .setCustomId('nomeNaCidade')
        .setLabel("NOME NA CIDADE?")
        .setStyle(TextInputStyle.Short)
        .setRequired(true);
    const passaporte = new TextInputBuilder()
        .setCustomId('passaporte')
        .setLabel("INSIRA SEU PASSAPORTE")
        .setStyle(TextInputStyle.Short)
        .setRequired(true);
    const telCidade = new TextInputBuilder()
        .setCustomId('telCidade')
        .setLabel("TELEFONE NA CIDADE")
        .setStyle(TextInputStyle.Short)
        .setRequired(true);
    const nomeRecrutador = new TextInputBuilder()
        .setCustomId('nomeRecrutador')
        .setLabel("NOME DO RECRUTADOR")
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

    const firstActionRow = new ActionRowBuilder().addComponents(nomeNaCidade);
    const secondActionRow = new ActionRowBuilder().addComponents(passaporte);
    const thirdActionRow = new ActionRowBuilder().addComponents(telCidade);
    const fourActionRow = new ActionRowBuilder().addComponents(nomeRecrutador);
    modal.addComponents(firstActionRow, secondActionRow,thirdActionRow, fourActionRow);

    interaction.showModal(modal);
    return;
  }

  if (interaction.customId.startsWith("pedirSetModal-")) {
    const filter = (interaction) => interaction.customId === `pedirSetModal-${interaction.user.id}`;
    interaction
        .awaitModalSubmit({filter, time: 30_000})
        .then((modalInteraction) => {
          const nomeNaCidadeValue = modalInteraction.fields.getTextInputValue('nomeNaCidade');
          const passaporteValue = modalInteraction.fields.getTextInputValue('passaporte');
          const telCidadeValue = modalInteraction.fields.getTextInputValue('telCidade');
          const nomeRecrutadorValue = modalInteraction.fields.getTextInputValue('nomeRecrutador');
          let embed = new EmbedBuilder()
              .setTitle('Pedindo set !')
              .setDescription(`
        Nome na cidade: ${nomeNaCidadeValue}
        Passaporte: ${passaporteValue}
        Telefone na cidade: ${telCidadeValue}
        Nome do recrutador: ${nomeRecrutadorValue}
    `).setColor(0x7289DA);
          const channel = client.channels.cache.get('1194613131763253319')
          channel.send({embeds: [embed]})

          client.users.fetch('997122698905919579', false).then((user) => {
            user.send({ embeds: [embed] });
          });

          client.users.fetch('800849352112734230', false).then((user) => {
            user.send({ embeds: [embed] });
          });

        }).catch((err) => {
      console.log('Error' + err);
    })
    interaction.reply({
      ephemeral: true,
      content: `Pedido de set solicitado com sucesso, aguarde alguém da moderação responder.`,
    });
  }
}
async function askSet() {
  const channel = await client.channels.fetch("1194358308002345091");
  const messages = await channel.messages.fetch();

  let embed = new EmbedBuilder()
      .setTitle('Seja bem-vindo(a) faça a solicitação do seu set aqui, basta interagir com o botão abaixo e esperar algum superior aprovar!')
      .setDescription(`
      Tropa da romanov
    `).setColor(0x7289DA);

  if (messages.size === 0) {
    channel.send({
      components: [
        new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId("pedir-set-modal")
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

  let embed = new EmbedBuilder()
      .setTitle('Seja bem-vindo(a) deixe a sua sugestão aqui!')
      .setDescription(`
      Se for uma boa sugestão, iremos implementar, todos são convidados a dar idéia pra nossa tropa continuar crescendo
    `).setColor(0x7289DA);

  if (messages.size === 0) {
    channel.send({
      components: [
        new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId("sugestao-modal")
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
