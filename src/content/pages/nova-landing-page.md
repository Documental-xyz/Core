---
title: Nova landing page
slug: novalandingpage
pageSettings:
  language: pt-BR
  link_pt_br: '#'
  link_en: '#'
  link_es: '#'
  animations: enable_all
  direction: left
  seoTitle: homepage documental
  seoDescription: Homepage da plataforma documental.xyz
  seoKeywords:
    - keyword: documental
    - keyword: documental.xyz
    - keyword: agência autônoma
    - keyword: autônoma advocacy
  seoImage: ''
pageTheme:
  primaryColor: ''
  secondaryColor: '#ffffff'
  highlightColor: '#3c8bc8'
  auxiliaryColor: '#104860'
  displayFont: https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap
  textFont: https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap
  spacingPatterns:
    - name: default
      mobile: '10'
      tablet: '10'
      desktop: '10'
mapbox:
  type: MapBox
  style: mapbox://styles/studio-autonoma/cmdgcs27u019101sa29ytbsps
  token: pk.eyJ1Ijoic3R1ZGlvLWF1dG9ub21hIiwiYSI6ImNtY3V2d3dtMTA0ZXgycnB4OW01cjlqb2QifQ.3NMaRt1maLlqTv6nlVqVHA
  centerLng: '10.706'
  centerLat: '29.771'
  zoom: '1.40'
  bearing: '0'
  pitch: '0'
  layers: ''
  columnAlign: left
  floatingText: false
  views: []
components:
  - type: Group
    id: Capa
    shortTitle: Capa
    longTitle: Home
    description: ''
    showInMenu: true
    animations: true
    txtColor: Secondary
    customTxtColor: ''
    bgColor: Custom
    customBgColor: '#1691c5ff'
    backgroundMedia:
      - type: backgroundImage
        imgSrc: /uploads/territorios-de-excecao.jpg
    overlay: ''
    components:
      - type: Columns
        paddingTop: false
        paddingBottom: false
        invertOnMobile: false
        columnsAlign: 33-66
        column1:
          components:
            - type: ImageBlock
              wideImage: false
              src: /uploads/documentalxyz.png
              alt: ''
              description: ''
        column2:
          components:
            - type: Spacer
              desktop: 200px
              tablet: ''
              mobile: ''
            - type: Text
              hasDropCap: false
              content: |-
                ### uma plataforma de código aberto

                ### e customizável para a criação e publicação de narrativas cartográficas multimídia.
            - type: Spacer
              desktop: 200px
              tablet: ''
              mobile: ''
  - type: Group
    id: O que a plataforma faz?
    shortTitle: O que a plataforma faz?
    longTitle: ''
    description: ''
    showInMenu: false
    animations: true
    txtColor: Primary
    customTxtColor: ''
    bgColor: Secondary
    customBgColor: ''
    backgroundMedia: []
    overlay: ''
    components:
      - type: Columns
        paddingTop: true
        paddingBottom: false
        invertOnMobile: false
        columnsAlign: 33-66
        column1:
          components:
            - type: Text
              hasDropCap: false
              content: '### O que a plataforma faz?'
        column2:
          components:
            - type: Text
              hasDropCap: false
              content: |-
                Através de uma interface intuitiva e de fácil manipulação, Documental.xyz possibilita a combinação de diferentes conteúdos multimídia (texto, imagem, dados, áudio e vídeo) com mapeamento de dados, gerando narrativas cartográficas visualmente envolventes e interativas.

                Desenhada para atender a realidade de movimentos sociais e organizações de defesa de direitos, a plataforma é um aplicativo gratuito e seu uso não exige conhecimento técnico avançado.
  - type: Group
    id: O que a plataforma faz?_2
    shortTitle: O que a plataforma faz?_2
    longTitle: ''
    description: ''
    showInMenu: false
    animations: true
    txtColor: Highlight
    customTxtColor: ''
    bgColor: Secondary
    customBgColor: ''
    backgroundMedia: []
    overlay: ''
    components:
      - type: Column
        paddingTop: false
        paddingBottom: true
        components:
          - type: Text
            hasDropCap: false
            content: |-
              ##### Documental.xyz é software livre: 

              ##### não tem custos de instalação, atualização, e pode ser usado, copiado, estudado, modificado e redistribuído sem quaisquer restrições.
          - type: Spacer
            desktop: 50px
            tablet: ''
            mobile: ''
          - type: Button
            link:
              url: https://www.advocacia.autonoma.xyz/
              target: _self
              text: Download
            icon: ''
            size: ''
  - type: Group
    id: Como a plataforma funciona?
    shortTitle: Como a plataforma funciona?
    longTitle: ''
    description: ''
    showInMenu: false
    animations: true
    txtColor: Secondary
    customTxtColor: ''
    bgColor: Highlight
    customBgColor: ''
    backgroundMedia: []
    overlay: ''
    components:
      - type: Columns
        paddingTop: true
        paddingBottom: true
        invertOnMobile: false
        columnsAlign: 66-33
        column1:
          components:
            - type: Text
              hasDropCap: false
              content: |-
                Documental.xyz utiliza recursos de "scrollytelling" integrados com navegação em dados GIS.

                "Scrollytelling" é uma técnica de web design para criar histórias multimídia que se desenrolam à medida que o usuário percorre a página. A plataforma oferece uma interface que permite a inclusão de conteúdos e o controle de dinâmica do "scrollytelling" combinados com a visualização de dados em mapas interativos.

                Através de parâmetros facilmente customizáveis na interface gráfica, a plataforma permite que o usuário tenha total controle sobre o design do conteúdo, oferecendo um recurso poderoso para a criação de narrativas visuais nos mais diversos formatos.
        column2:
          components:
            - type: Text
              hasDropCap: false
              content: '### Como a plataforma funciona?'
  - type: Group
    id: Portfólio_Como usar a plataforma
    shortTitle: Portfólio_Como usar a plataforma
    longTitle: ''
    description: ''
    showInMenu: false
    animations: true
    txtColor: Primary
    customTxtColor: ''
    bgColor: Secondary
    customBgColor: ''
    backgroundMedia: []
    overlay: ''
    components:
      - type: Columns
        paddingTop: false
        paddingBottom: false
        invertOnMobile: false
        columnsAlign: 66-33
        column1:
          components:
            - type: Text
              hasDropCap: false
              content: '# PORTFÓLIO'
            - type: Spacer
              desktop: 25px
              tablet: ''
              mobile: ''
            - type: Text
              hasDropCap: false
              content: projetos realizados com a plataforma
        column2:
          components:
            - type: Spacer
              desktop: 10px
              tablet: ''
              mobile: ''
      - type: CardsCall
        cardsCallArr:
          - link:
              url: https://v1.documental.xyz/pt/alter-ameacada
              target: ''
              customTarget: ''
            img:
              src: /uploads/vende-se-03.jpeg
              alt: ''
            title: ''
            text: ''
          - link:
              url: https://documental.xyz/territorios-de-excecao/
              target: ''
              customTarget: ''
            img:
              src: /uploads/territorios-de-excecao.jpg
              alt: ''
            title: ''
            text: ''
      - type: CardsCall
        cardsCallArr:
          - link:
              url: https://documental.xyz/expulsions/
              target: ''
              customTarget: ''
            img:
              src: /uploads/expulsion-san-marcos.jpg
              alt: ''
            title: ''
            text: ''
          - link:
              url: https://documental.xyz/nhanderekoa/
              target: ''
              customTarget: ''
            img:
              src: /uploads/imagem_16_ocupacao_antena.jpg
              alt: ''
            title: ''
            text: ''
      - type: Columns
        paddingTop: true
        paddingBottom: false
        invertOnMobile: false
        columnsAlign: 66-33
        column1:
          components:
            - type: Text
              hasDropCap: false
              content: '# COMO USAR A PLATAFORMA?'
            - type: Spacer
              desktop: 150px
              tablet: ''
              mobile: ''
            - type: Text
              hasDropCap: false
              content: |-
                **+ NO SEU SERVIDOR**

                Instale a plataforma em seu servidor usando o código disponível no repositório do Github. O passo a passo da instalação está documentado no Guia de Instalação e Uso.

                **+ EM NOSSO SERVIDOR**

                Seu projeto pode utilizar a plataforma em nosso servidor, sem necessidade de instalação. Oferecemos infraestrutura e suporte técnico para a implementação e utilização da plataforma para movimentos sociais e entidades de defesa de direitos humanos e ambientais.

                Projetos podem ser submetidos através do email contato@documental.xyz

                **+ NO GITHUB PAGES**

                Documental.xyz roda diretamente no GitHub pages, sem necessidade de servidor. Este método requer conhecimento técnico avançado. A arquitetura de instalação está documentada no guia Documental.cyz@GitHub.
        column2:
          components:
            - type: Spacer
              desktop: 150px
              tablet: ''
              mobile: ''
            - type: Cards
              cardsArr:
                - Card:
                    type: Card
                    title: Github
                    text: Código aberto e livre para uso. Você pode baixar o código em nosso repositório github e instalar Documental.xxyz em seu servidor
                    link:
                      url: https://www.advocacia.autonoma.xyz/
                      target: ''
                      customTarget: ''
                      text: Acesse aqui
                    icon: ''
                - Card:
                    type: Card
                    title: Documentação
                    text: Documentação completa sobre como instalar e usar o Documental.xyz. Baixe o código e verifique o repositório de documentação para obter informações detalhadas.
                    link:
                      url: https://www.advocacia.autonoma.xyz/
                      target: ''
                      customTarget: ''
                      text: Acesse aqui
                    icon: ''
                - Card:
                    type: Card
                    title: Licença
                    text: Aqui você encontra a licença de uso do Documental.xyz
                    link:
                      url: https://www.advocacia.autonoma.xyz/
                      target: ''
                      customTarget: ''
                      text: Acesse aqui
                    icon: ''
  - type: Group
    id: Qual é o objetivo do projeto?
    shortTitle: Qual é o objetivo do projeto?
    longTitle: ''
    description: ''
    showInMenu: false
    animations: true
    txtColor: Secondary
    customTxtColor: ''
    bgColor: Highlight
    customBgColor: ''
    backgroundMedia: []
    overlay: ''
    components:
      - type: Columns
        paddingTop: true
        paddingBottom: true
        invertOnMobile: false
        columnsAlign: 66-33
        column1:
          components:
            - type: Text
              hasDropCap: false
              content: |-
                Documental.xyz foi originalmente pensada e desenhada como instrumento de defesa de direitos humanos e ambientais.

                O objetivo da plataforma é oferecer uma ferramenta open-source para movimentos sociais, organizações civis e jornalistas documentarem e comunicarem histórias locais para audiências globais de forma socialmente envolvente e visualmente impactante.

                A plataforma busca contribuir para a construção da capacidade da sociedade civil em investigar e documentar violações de direitos cometidas por estados e corporações, empoderando atores locais para comunicarem suas histórias através de novas tecnologias de visualização e mapeamento de dados, ao mesmo tempo que ampliando o debate público sobre justiça social e ambiental.
        column2:
          components:
            - type: Text
              hasDropCap: false
              content: '### Qual é o objetivo do projeto?'
---

