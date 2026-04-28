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
  auxiliaryColor: '#000000'
  displayFont: https://fonts.googleapis.com/css2?family=Roboto&display=swap
  textFont: https://fonts.googleapis.com/css2?family=Roboto&display=swap
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
        paddingTop: true
        paddingBottom: false
        invertOnMobile: false
        columnsAlign: 33-66
        column1:
          components:
            - type: ImageBlock
              wideImage: false
              src: /uploads/documental.png
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
              content: '# UMA PLATAFORMA DE CÓDIGO ABERTO E CUSTOMIZÁVEL PARA A CRIAÇÃO E PUBLICAÇÃO DE NARRATIVAS CARTOGRÁFICAS MULTIMÍDIA.'
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
              content: '# O QUE A PLATAFORMA FAZ?'
        column2:
          components:
            - type: Text
              hasDropCap: false
              content: '### **Através de uma interface intuitiva e de fácil manipulação, Documental.xyz possibilita a combinação de diferentes conteúdos multimídia (texto, imagem, dados, áudio e vídeo) com mapeamento de dados, gerando narrativas cartográficas visualmente envolventes e interativas.**'
            - type: Spacer
              desktop: 50px
              tablet: ''
              mobile: ''
            - type: Text
              hasDropCap: false
              content: '### Desenhada para atender a realidade de movimentos sociais e organizações de defesa de direitos, a plataforma é um aplicativo gratuito e seu uso não exige conhecimento técnico avançado.'
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
              # Documental.xyz é software livre: 

              # não tem custos de instalação, atualização, e pode ser usado, copiado, estudado, modificado e redistribuído sem quaisquer restrições.
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
                ##### Documental.xyz utiliza recursos de "scrollytelling" integrados com navegação em dados GIS.

                ##### ######
            - type: Spacer
              desktop: 50px
              tablet: ''
              mobile: ''
            - type: Text
              hasDropCap: false
              content: '##### "Scrollytelling" é uma técnica de web design para criar histórias multimídia que se desenrolam à medida que o usuário percorre a página. A plataforma oferece uma interface que permite a inclusão de conteúdos e o controle de dinâmica do "scrollytelling" combinados com a visualização de dados em mapas interativos.'
            - type: Spacer
              desktop: 50px
              tablet: ''
              mobile: ''
            - type: Text
              hasDropCap: false
              content: '##### Através de parâmetros facilmente customizáveis na interface gráfica, a plataforma permite que o usuário tenha total controle sobre o design do conteúdo, oferecendo um recurso poderoso para a criação de narrativas visuais nos mais diversos formatos.'
        column2:
          components:
            - type: Text
              hasDropCap: false
              content: '# COMO A PLATAFORMA FUNCIONA?'
  - type: Group
    id: Portfólio_Como usar a plataforma
    shortTitle: Portfólio_Como usar a plataforma
    longTitle: ''
    description: ''
    showInMenu: false
    animations: true
    txtColor: Custom
    customTxtColor: '#1c4878ff'
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
              content: '##### projetos realizados com a plataforma'
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
              src: /uploads/alter-do-chao-azul.png
              alt: ''
            title: Alter do Chão Ameaçada
            text: O projeto Alter do Chão Ameaçada, produzido pela Frente de Comunicação Indígena Borari e publicado na plataforma Documental com mentoria de Adriano Belisário (MediaLab/UFRJ), investiga a ameaça ao povo indígena Borari, em Santarém, no Pará, devido à especulação imobiliária e ocupação desordenada da região. Através da análise de mapas e imagens de satélite, a pesquisa mapeou o território Borari e seus sítios arqueológicos, assim como os danos ambientais causados aos igarapés e nascentes, como forma de visualizar a extensão das violações causadas e pleitear pela demarcação da Terra Indígena.
          - link:
              url: https://documental.xyz/territorios-de-excecao/
              target: ''
              customTarget: ''
            img:
              src: /uploads/territorios-de-excecao-azul.png
              alt: ''
            title: Territórios de Exceção
            text: Uma parceria entre a agência autônoma e o MediaLab (UFRJ), o caso Territórios da Exceção investigou o uso de helicópteros como plataforma de disparos da polícia militar nas favelas do Rio de Janeiro para compreender a dinâmica e os impactos deste tipo de operação sobre os direitos fundamentais das populações e comunidades atingidas. Utilizando ciência de visualização de dados, dados governamentais e de mídias sociais, investigações de campo e técnicas de arquitetura forense, a pesquisa apresenta as evidências por meio de vídeos, animações, imagens em 3D e informações georreferenciadas, oferecendo uma experiência imersiva dentro dos mapas e localidades.
      - type: CardsCall
        cardsCallArr:
          - link:
              url: https://documental.xyz/expulsions/
              target: ''
              customTarget: ''
            img:
              src: /uploads/expulsion-san-marcos-azul.png
              alt: ''
            title: Expulsões
            text: O caso Expulsões, realizado através da parceria entre a agência autônoma e o Forensic Architecture, investiga violações de direitos humanos e ambientais decorrentes da implantação de um megaprojeto de mineração na região da Cordilheira de Cóndor, na Amazônia Equatoriana. Através da análise de imagens de satélite e de testemunhos das vítimas, com o apoio de atores locais, a investigação mapeou processos de despossessão de comunidades e povos indígenas, desmatamento e destruição de sítios arqueológicos, demonstrando as dinâmicas espaciais de uma ação coordenada de violações sistemáticas.
          - link:
              url: https://documental.xyz/nhanderekoa/
              target: ''
              customTarget: ''
            img:
              src: /uploads/imagem_16_ocupacao_antena-azul.png
              alt: ''
            title: Nhanderekoa
            text: 'O projeto Arquiteturas da Reparação: São Paulo Terra Indígena foi desenvolvido no âmbito das instituições agência autônoma, Chão Coletivo e Plataforma Práticas Espaciais / Escola da Cidade, com apoio do CAU/SP. Ele apresenta uma cartografia da Terra Indígena Guarani do Jaraguá, em São Paulo, no momento de sua demarcação física entre julho e setembro de 2025. Esse território preserva um dos últimos fragmentos de Mata Atlântica na cidade, e carrega enorme importância ambiental, climática e espiritual para os povos Guarani, que habitam a região desde tempos imemoriais. Nhanderekoa – “onde nossa cultura vive”, nome dado ao conjunto de cartografias e análises mostradas aqui, combina análise de dados geoespaciais, cartografia participativa, entrevistas e arquivos históricos para traçar um panorama das práticas de defesa, cuidado e reparação das florestas do Jaraguá, ao mesmo tempo em que identifica ameaças atuais ao território. Nhanderekoa expressa o entendimento Guarani de que a floresta – com seus animais, plantas e espíritos – é parte inseparável do modo de vida, constituindo uma extensão de moradia compartilhada entre seres humanos e não humanos.'
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
            - type: Timeline
              components:
                - type: TimelineBullet
                  text: NO SEU SERVIDOR
                  content: '##### Instale a plataforma em seu servidor usando o código base da Documental disponível no repositório do Github. A integração com o seu servidor requer conhecimento técnico avançado. A arquitetura de instalação está detalhada na documentação oficial da Documental.'
                - type: Spacer
                  desktop: 50px
                  tablet: ''
                  mobile: ''
                - type: TimelineBullet
                  text: EM NOSSO SERVIDOR
                  content: |-
                    Seu projeto pode utilizar a plataforma em nosso servidor, sem necessidade de instalação. Oferecemos infraestrutura e suporte técnico para a implementação e utilização da plataforma para movimentos sociais e entidades de defesa de direitos humanos e ambientais.

                    Projetos podem ser submetidos através do email **contato@documental.xyz**
                - type: Spacer
                  desktop: 50px
                  tablet: ''
                  mobile: ''
                - type: TimelineBullet
                  text: NO GITHUB PAGES
                  content: Documental.xyz roda diretamente no GitHub pages, sem necessidade de servidor.  O passo a passo para a clonagem do repositório base da Documental e publicação no GitHub pages está detalhado na documentação oficial da Documental.
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
              content: '###### Documental.xyz foi originalmente pensada e desenhada como instrumento de defesa de direitos humanos e ambientais.'
            - type: Spacer
              desktop: 50px
              tablet: ''
              mobile: ''
            - type: Text
              hasDropCap: false
              content: '###### O objetivo da plataforma é oferecer uma ferramenta open-source para movimentos sociais, organizações civis e jornalistas documentarem e comunicarem histórias locais para audiências globais de forma socialmente envolvente e visualmente impactante.'
            - type: Spacer
              desktop: 50px
              tablet: ''
              mobile: ''
            - type: Text
              hasDropCap: false
              content: '###### A plataforma busca contribuir para a construção da capacidade da sociedade civil em investigar e documentar violações de direitos cometidas por estados e corporações, empoderando atores locais para comunicarem suas histórias através de novas tecnologias de visualização e mapeamento de dados, ao mesmo tempo que ampliando o debate público sobre justiça social e ambiental.'
        column2:
          components:
            - type: Text
              hasDropCap: false
              content: '# Qual é o objetivo do projeto?'
  - type: Group
    id: Download e Documentação
    shortTitle: Download e Documentação
    longTitle: ''
    description: ''
    showInMenu: true
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
              content: '### Download e Documentação'
        column2:
          components: []
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
      - type: Column
        paddingTop: false
        paddingBottom: false
        components:
          - type: VideoEmbed
            wideVideo: false
            videoUrl: https://www.youtube.com/embed/8tPnX7OPo0Q?si=avGZ530ghpTIZ16z
            videoCaption: ''
      - type: Columns
        paddingTop: false
        paddingBottom: false
        invertOnMobile: false
        columnsAlign: 66-33
        column1:
          components:
            - type: Text
              hasDropCap: false
              content: '### Arquitetura técnica do back end'
            - type: Spacer
              desktop: 50px
              tablet: ''
              mobile: ''
            - type: Text
              hasDropCap: false
              content: Documental.xyz é baseada na integração de recursos do sistema de publicação Sveltia com o serviço de mapas online Mapbox. A plataforma é rodada através de uma arquitetura leve e facilmente compreensíve. Esta arquitetura é ampliada para outras possíveis utilidades, tornando-se o projeto BASE Document.you
        column2:
          components: []
  - type: Group
    id: Créditos
    shortTitle: Créditos
    longTitle: ''
    description: ''
    showInMenu: false
    animations: true
    txtColor: Primary
    customTxtColor: ''
    bgColor: Highlight
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
              content: '**Documental.xyz** foi originalmente desenvolvida em 2019 pela agência **Autônoma** e pelo **MediaLab UFRJ**, em colaboração com a **Rede LAVITS**.'
            - type: LogosGroup
              logos:
                - image: /uploads/autonoma-black-redim.png
                  link:
                    url: https://www.advocacia.autonoma.xyz/
                    target: ''
                    customTarget: ''
                    title: ''
                - image: /uploads/medialab-redim-semfundo.png
                  link:
                    url: https://medialabufrj.net/
                    target: ''
                    customTarget: ''
                    title: ''
                - image: /uploads/logo-2.png
                  link:
                    url: https://lavits.org/
                    target: ''
                    customTarget: ''
                    title: ''
        column2:
          components:
            - type: Text
              hasDropCap: false
              content: '#### CRÉDITOS'
            - type: Spacer
              desktop: 50px
              tablet: ''
              mobile: ''
            - type: Text
              hasDropCap: false
              content: |-
                Coordenação: **Paulo Tavares, Fernanda Bruno e Paula Marujo**

                Design e front end: **atonal.studio**

                Back end e documentação: **Thiago Paixão**

                Implementação e documentação:**&#32;Julia Veras**
---

