// =============================================================
// ARQUIVO PRINCIPAL DE DADOS - EDITE AQUI PARA ATUALIZAR O APP
// =============================================================
// Para adicionar um jogo: copie um bloco { } e preencha os campos
// Para remover: apague o bloco correspondente
// Para editar preço, descrição etc.: altere o valor do campo
// =============================================================

// ✅ SEU NÚMERO DE WHATSAPP (formato internacional, sem + nem espaços)
// ⚠️ IMPORTANTE: substitua pelo seu número real antes de publicar o app!
// Exemplo: '5521987654321' (55=Brasil, 21=DDD, 987654321=número)
export const WHATSAPP_NUMBER = '5511999999999';

// ✅ CATÁLOGO DE JOGOS
export const games = [
  {
    id: '1',
    title: 'Spider-Man 2',
    platform: 'PS5',
    price: 249.90,
    originalPrice: 349.90,       // null se não tiver promoção
    cover: 'https://placehold.co/300x400/1a1a2e/ffffff?text=Spider-Man+2',
    description:
      'Peter Parker e Miles Morales retornam em uma emocionante aventura pelas ruas de Nova York. Enfrente o temível Venom e explore poderes nunca antes vistos. Uma das maiores aventuras do Homem-Aranha até hoje.',
    language: 'Português',
    isNew: true,
    isPromo: true,
    genre: 'Ação/Aventura',
    type: 'Jogo',
  },
  {
    id: '2',
    title: 'God of War Ragnarök',
    platform: 'PS4/PS5',
    price: 199.90,
    originalPrice: 299.90,
    cover: 'https://placehold.co/300x400/1a1a2e/ffffff?text=God+of+War',
    description:
      'Kratos e Atreus embarcam em uma jornada épica pelos Nove Reinos em busca de respostas antes do fim de tudo. Enfrente criaturas lendárias e deuses nórdicos num combate visceral e emocionante.',
    language: 'Português',
    isNew: false,
    isPromo: true,
    genre: 'Ação/RPG',
    type: 'Jogo',
  },
  {
    id: '3',
    title: 'Hogwarts Legacy',
    platform: 'PS4/PS5',
    price: 179.90,
    originalPrice: null,
    cover: 'https://placehold.co/300x400/1a1a2e/ffffff?text=Hogwarts+Legacy',
    description:
      'Vivencie a magia do mundo bruxo no século XIX. Explore Hogwarts, a floresta proibida e Hogsmeade enquanto domina feitiços, cultiva plantas mágicas e enfrenta um perigo que ameaça o mundo dos bruxos.',
    language: 'Português',
    isNew: false,
    isPromo: false,
    genre: 'RPG/Aventura',
    type: 'Jogo',
  },
  {
    id: '4',
    title: 'EA FC 25',
    platform: 'PS4/PS5',
    price: 99.90,
    originalPrice: 249.90,
    cover: 'https://placehold.co/300x400/1a1a2e/ffffff?text=EA+FC+25',
    description:
      'O melhor jogo de futebol do mundo com times, ligas e jogadores reais. Ultimate Team renovado, modo carreira aprimorado e gráficos incríveis no PS5 com tecnologia HyperMotion V.',
    language: 'Português',
    isNew: true,
    isPromo: true,
    genre: 'Esportes',
    type: 'Jogo',
  },
  {
    id: '5',
    title: 'Mortal Kombat 1',
    platform: 'PS5',
    price: 189.90,
    originalPrice: 299.90,
    cover: 'https://placehold.co/300x400/1a1a2e/ffffff?text=Mortal+Kombat+1',
    description:
      'O recomeço brutal da franquia mais icônica dos jogos de luta. Liu Kang remodela o universo com uma nova linha do tempo. Fatalities impressionantes e novo sistema de Kameo Fighters.',
    language: 'Inglês',
    isNew: false,
    isPromo: true,
    genre: 'Luta',
    type: 'Jogo',
  },
  {
    id: '6',
    title: 'Conta PS5 Premium',
    platform: 'PS5',
    price: 149.90,
    originalPrice: null,
    cover: 'https://placehold.co/300x400/1a1a2e/ffffff?text=Conta+PS5',
    description:
      'Conta PS5 com acesso a múltiplos jogos digitais. Inclui títulos exclusivos do PlayStation Plus Premium. Entrega imediata após confirmação do pagamento.',
    language: 'Multilíngue',
    isNew: true,
    isPromo: false,
    genre: 'Conta Digital',
    type: 'Conta',
  },
  {
    id: '7',
    title: 'Resident Evil 4 Remake',
    platform: 'PS4/PS5',
    price: 169.90,
    originalPrice: 249.90,
    cover: 'https://placehold.co/300x400/1a1a2e/ffffff?text=RE4+Remake',
    description:
      'Leon S. Kennedy está de volta numa versão completamente reimaginada do clássico Resident Evil 4. Gráficos fotorrealistas, jogabilidade modernizada e o mesmo terror e ação que conquistaram fãs do mundo todo.',
    language: 'Português',
    isNew: false,
    isPromo: true,
    genre: 'Terror/Ação',
    type: 'Jogo',
  },
  {
    id: '8',
    title: 'Elden Ring',
    platform: 'PS4/PS5',
    price: 199.90,
    originalPrice: null,
    cover: 'https://placehold.co/300x400/1a1a2e/ffffff?text=Elden+Ring',
    description:
      'Uma obra-prima desenvolvida em parceria com George R.R. Martin. Explore as Terras Intermédias num vasto mundo aberto repleto de segredos, chefes desafiadores e uma narrativa rica e profunda.',
    language: 'Inglês',
    isNew: true,
    isPromo: false,
    genre: 'RPG/Ação',
    type: 'Jogo',
  },
];
