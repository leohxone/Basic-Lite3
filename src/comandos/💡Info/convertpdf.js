const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
const { PDFDocument } = require('pdf-lib');
const { Document, Paragraph, Packer } = require('docx');
const fs = require('fs');

module.exports = {
  DESCRIPTION: "Convierte un archivo pdf a word",

  async execute(client, message, args, prefix, errorEmbed) {
    const attach = message.attachments.first();
    if(!attach || attach.contentType !== 'application/pdf') {
      return message.reply({ embeds: [errorEmbed('Debes subir un archivo PDF válido.')] });
    }

    const pdfBuffer = await attach.fetch();
    const pdfDoc = await PDFDocument.load(pdfBuffer);
    const pdfText = await pdfDoc.copyText();

    const doc = new Document();
    const paragraph = new Paragraph(pdfText);
    doc.addParagraph(paragraph);

    const fileName = attach.name.replace(/\.pdf$/i, '.docx');
    const filePath = `./${fileName}`;

    const packer = new Packer();
    const buffer = await packer.toBuffer(doc);
    fs.writeFileSync(filePath, buffer);

    const embed = new EmbedBuilder()
      .setColor("Green")
      .setTitle(`:white_check_mark: Archivo convertido exitosamente`)
      .setDescription(`El archivo ha sido convertido y guardado como \`${fileName}\``)
      .setTimestamp()
      .attachFiles(filePath);
      
    return message.reply({ embeds: [embed] });
  }
}
