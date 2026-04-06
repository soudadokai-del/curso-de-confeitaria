import { Module } from "./types";

export const THEME = {
  bg: "#FDFCF0",
  primary: "#4B2C20", // Chocolate
  accent: "#E8AEB7",  // Rosa sofisticado
  gold: "#D4AF37",    // Dourado suave
};

export const MODULES: Module[] = [
  {
    id: "m1",
    title: "Pudins Sem Fogo",
    description: "Aprenda a fazer pudins deliciosos sem precisar de forno.",
    imageUrl: "https://static.itdg.com.br/images/640-400/d1307a2e17cda187df76b78cfd3ac464/shutterstock-2322251819-1-.jpg",
    lessons: [
      { id: "l1", title: "Pudim de Leite Ninho", videoUrl: "https://www.youtube.com/watch?v=cAoj7dRDPoU" },
      { id: "l2", title: "Pudim de Geladeira", videoUrl: "https://www.youtube.com/watch?v=Ivi6beyXuLw" },
      { id: "l3", title: "Pudim de Copinho para Venda", videoUrl: "https://www.youtube.com/watch?v=gff_-spk3NA" },
    ],
  },
  {
    id: "m2",
    title: "Pavês",
    description: "Técnicas avançadas para pavês que encantam no sabor e visual.",
    imageUrl: "https://i.ytimg.com/vi/KtG5yL13uBY/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCa3WW4we_2fInLRYgajW3MX94bUg",
    lessons: [
      { id: "l4", title: "Pavê de Bombom", videoUrl: "https://www.youtube.com/watch?v=VOhw430kgc4" },
      { id: "l5", title: "Pavê de Limão", videoUrl: "https://www.youtube.com/watch?v=zBsnIXvwd3g" },
      { id: "l6", title: "Pavê de Chocolate", videoUrl: "https://www.youtube.com/watch?v=xGaKjgaDLwk" },
    ],
  },
  {
    id: "m3",
    title: "Mousses e Cremes",
    description: "Texturas perfeitas e sabores equilibrados para suas sobremesas.",
    imageUrl: "https://www.em.com.br/emfoco/wp-content/uploads/2026/03/ChatGPT-Image-10-de-mar.-de-2026-19_32_16-1.png",
    lessons: [
      { id: "l7", title: "Base de Mousses", videoUrl: "https://www.youtube.com/watch?v=B44c9o20znI" },
      { id: "l8", title: "Mousse de Abacaxi", videoUrl: "https://www.youtube.com/watch?v=YIDK5uNG3-w" },
      { id: "l9", title: "Mousse de Maracujá", videoUrl: "https://www.youtube.com/watch?v=tAC4uZzqyQ0" },
    ],
  },
  {
    id: "m4",
    title: "Recheios e Coberturas",
    description: "O segredo dos bolos profissionais está nos detalhes.",
    imageUrl: "https://i.ytimg.com/vi/KrLI5O0BOp8/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAt7FMcOU47cReKbGXl07SjXdJhNg",
    lessons: [
      { id: "l10", title: "Brigadeiro Gourmet Estruturado (Ponto de Bico)", videoUrl: "https://www.youtube.com/watch?v=LV17N9O9Dyg" },
      { id: "l11", title: "Recheio Quatro Leites para Bolos de Festa", videoUrl: "https://www.youtube.com/watch?v=fJzcBzvDJQ4" },
      { id: "l12", title: "Chantininho Estabilizado (Resistente ao Calor)", videoUrl: "https://www.youtube.com/watch?v=IdYApspoeFc" },
    ],
  },
  {
    id: "m5",
    title: "Bolos (Pote e Tradicional)",
    description: "Massa amanteigada e montagem de bolos de pote lucrativos.",
    imageUrl: "https://guiadacozinha.com.br/wp-content/uploads/2019/10/bolo-no-pote-floresta-negra.jpg",
    lessons: [
      { id: "l13", title: "Bolo de Pote de Brigadeiro Lucrativo", videoUrl: "https://www.youtube.com/watch?v=uIi5EVfT7yc" },
      { id: "l14", title: "Pão de Ló Profissional (Massa Base)", videoUrl: "https://www.youtube.com/watch?v=QjzDd6CIzPc" },
      { id: "l15", title: "Bolo de Cenoura com Cobertura Perfeita", videoUrl: "https://www.youtube.com/watch?v=SpAoyh3hcPk" },
    ],
  },
];

export const CERTIFICATE_LINK = "https://wa.me/556182373646?text=Olá!%20Concluí%20todo%20o%20curso%20de%20confeitaria%20e%20quero%20meu%20certificado!%20Nome:%20____";
