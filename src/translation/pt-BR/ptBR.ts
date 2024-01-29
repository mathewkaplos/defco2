const dictionary = {
  

  projectName: 'Projeto',

  shared: {
    yes: 'Sim',
    no: 'Não',
    cancel: 'Cancelar',
    save: 'Salvar',
    clear: 'Limpar',
    decline: 'Recusar',
    accept: 'Aceitar',
    dashboard: 'Painel',
    new: 'Novo',
    searchNotFound: 'Nada encontrado.',
    searchPlaceholder: 'Pesquisar...',
    selectPlaceholder: 'Escolher uma opção',
    datePlaceholder: 'Escolha uma data',
    timePlaceholder: 'Escolha um horário',
    dateFormat: 'DD MMM, YYYY',
    timeFormat: 'hh:mmA',
    datetimeFormat: 'DD MMM, YYYY hh:mmA',
    tagsPlaceholder: 'Digite e aperte enter para adicionar',
    edit: 'Editar',
    delete: 'Excluir',
    openMenu: 'Abrir menu',
    submit: 'Enviar',
    search: 'Pesquisar',
    reset: 'Redefinir',
    min: 'Mín',
    max: 'Máx',
    view: 'Visualizar',
    copiedToClipboard: 'Copiado para a área de transferência',
    exportToCsv: 'Exportar para CSV',
    import: 'Importar',
    pause: 'Pausar',
    discard: 'Descartar',
    preferences: 'Preferências',
    session: 'Sessão',
    deleted: 'Excluído',
    remove: 'Remover',
    startDate: 'Data de Início',
    endDate: 'Data de Término',

    importer: {
      importHashAlreadyExists: 'Dados já foram importados',
      title: 'Importar arquivo CSV',
      menu: 'Importar arquivo CSV',
      line: 'Linha',
      status: 'Status',
      pending: 'Pendente',
      success: 'Importado',
      error: 'Erro',
      total: `{0} importados, {1} pendentes e {2} com erro`,
      importedMessage: `Processado {0} de {1}.`,
      noValidRows: 'Não há linhas válidas.',
      noNavigateAwayMessage:
        'Não saia desta página ou a importação será interrompida.',
      completed: {
        success:
          'Importação concluída. Todas as linhas foram importadas com sucesso.',
        someErrors:
          'Processamento concluído, mas algumas linhas não puderam ser importadas.',
        allErrors: 'Falha na importação. Não há linhas válidas.',
      },
      form: {
        downloadTemplate: 'Baixar modelo',
      },
      list: {
        newConfirm: 'Tem certeza?',
        discardConfirm: 'Tem certeza? Dados não importados serão perdidos.',
      },
      errors: {
        invalidFileEmpty: 'O arquivo está vazio',
        invalidFileCsv: 'Somente arquivos CSV (.csv) são permitidos',
        invalidFileUpload:
          'Arquivo inválido. Certifique-se de usar a última versão do modelo.',
        importHashRequired: 'Hash de importação é obrigatório',
        importHashExistent: 'Dados já foram importados',
      },
    },

    dataTable: {
      filters: 'Filtros',
      noResults: 'Nenhum resultado encontrado.',
      viewOptions: 'Visualizar',
      toggleColumns: 'Alternar colunas',
      actions: 'Ações',

      sortAscending: 'Asc',
      sortDescending: 'Desc',
      hide: 'Ocultar',

      selectAll: 'Selecionar tudo',
      selectRow: 'Selecionar linha',
      paginationTotal: 'Total: {0} linha(s)',
      paginationSelected: '{0} linha(s) selecionada(s)',
      paginationRowsPerPage: 'Linhas por página',
      paginationCurrent: `Página {0} de {1}`,
      paginationGoToFirst: 'Ir para a primeira página',
      paginationGoToPrevious: 'Ir para a página anterior',
      paginationGoToNext: 'Ir para a próxima página',
      paginationGoToLast: 'Ir para a última página',
    },

    locales: {
      en: 'Inglês',
      es: 'Espanhol',
      de: 'Alemão',
      'pt-BR': 'Português (Brasil)',
    },

    localeSwitcher: {
      searchPlaceholder: 'Procurar idioma...',
      title: 'Idioma',
      placeholder: 'Selecionar um idioma',
      searchEmpty: 'Nenhum idioma encontrado.',
    },

    theme: {
      toggle: 'Tema',
      light: 'Claro',
      dark: 'Escuro',
      system: 'Sistema',
    },

    errors: {
      cannotDeleteReferenced: `Não é possível excluir {0} porque está referenciado por um ou mais {1}.`,
      timezone: 'Fuso horário inválido',
      required: `{0} é um campo obrigatório`,
      invalid: `{0} é inválido`,
      dateFuture: `{0} deve estar no futuro`,
      unknown: 'Ocorreu um erro',
      unique: 'O {0} deve ser único',
    },
  },

  apiKey: {
    docs: {
      menu: 'Documentação da API',
    },
    form: {
      addAll: 'Adicionar Tudo',
    },
    edit: {
      menu: 'Editar Chave da API',
      title: 'Editar Chave da API',
      success: 'Chave da API atualizada com sucesso',
    },
    new: {
      menu: 'Nova Chave da API',
      title: 'Nova Chave da API',
      success: 'Chave da API criada com sucesso',
      text: `Salve sua chave da API! Por razões de segurança, você só poderá vê-la uma vez.`,
      subtext: `Você deve adicioná-la ao cabeçalho Authorization das suas chamadas de API.`,
      backToApiKeys: 'Voltar para Chaves da API',
    },
    list: {
      menu: 'Chaves da API',
      title: 'Chaves da API',
      viewActivity: 'Ver Atividade',
      noResults: 'Nenhuma chave da API encontrada.',
    },
    destroy: {
      confirmTitle: 'Excluir Chave da API?',
      success: 'Chave da API excluída com sucesso',
    },
    enumerators: {
      status: {
        active: 'Ativo',
        disabled: 'Desativado',
        expired: 'Expirado',
      },
    },
    fields: {
      apiKey: 'Chave da API',
      membership: 'Usuário',
      name: 'Nome',
      keyPrefix: 'Prefixo da Chave',
      key: 'Chave',
      scopes: 'Escopos',
      expiresAt: 'Expira Em',
      status: 'Status',
      createdAt: 'Criado Em',
      disabled: 'Desativado',
    },
    disabledTooltip: `Desativado em {0}.`,
    errors: {
      invalidScopes: 'escopos devem corresponder ao papel do usuário',
    },
  },

  file: {
    button: 'Enviar',
    delete: 'Excluir',
    errors: {
      formats: `Formato inválido. Deve ser um dos seguintes: {0}.`,
      notImage: `O arquivo deve ser uma imagem`,
      tooBig: `O arquivo é muito grande. O tamanho atual é {0} bytes, o tamanho máximo é {1} bytes`,
    },
  },

  auth: {
    signIn: {
      oauthError: 'Não é possível entrar com esse provedor. Use outro.',
      title: 'Entrar',
      button: 'Entrar com Email',
      success: 'Entrou com sucesso',
      email: 'Email',
      password: 'Senha',
      socialHeader: 'Ou continue com',
      facebook: 'Facebook',
      github: 'GitHub',
      google: 'Google',
      passwordResetRequestLink: 'Esqueceu a senha?',
      signUpLink: 'Não tem uma conta? Crie uma',
    },
    signUp: {
      title: 'Cadastrar',
      signInLink: 'Já tem uma conta? Entre',
      button: 'Cadastrar',
      success: 'Cadastro realizado com sucesso',
      email: 'Email',
      password: 'Senha',
    },
    verifyEmailRequest: {
      title: 'Reenviar verificação de email',
      button: 'Reenviar verificação de email',
      message:
        'Por favor, confirme seu email em <strong>{0}</strong> para continuar.',
      success: 'Verificação de email enviada com sucesso!',
    },
    verifyEmailConfirm: {
      title: 'Verifique seu email',
      success: 'Email verificado com sucesso.',
      loadingMessage: 'Só um momento, seu email está sendo verificado...',
    },
    passwordResetRequest: {
      title: 'Esqueceu a Senha',
      signInLink: 'Cancelar',
      button: 'Enviar email para redefinir senha',
      email: 'Email',
      success: 'Email para redefinição de senha enviado com sucesso',
    },
    passwordResetConfirm: {
      title: 'Redefinir Senha',
      signInLink: 'Cancelar',
      button: 'Redefinir Senha',
      password: 'Senha',
      success: 'Senha alterada com sucesso',
    },
    noPermissions: {
      title: 'Aguardando Permissões',
      message:
        'Você ainda não tem permissões. Aguarde o administrador concedê-las.',
    },
    invitation: {
      title: 'Convites',
      success: 'Convite aceito com sucesso',
      acceptWrongEmail: 'Aceitar Convite Com Este Email',
      loadingMessage: 'Só um momento, estamos aceitando o convite...',
      invalidToken: 'Token de convite expirado ou inválido.',
    },
    tenant: {
      title: 'Espaços de Trabalho',
      create: {
        name: 'Nome do Espaço de Trabalho',
        success: 'Espaço de Trabalho criado com sucesso',
        button: 'Criar Espaço de Trabalho',
      },
      select: {
        tenant: 'Selecionar um Espaço de Trabalho',
        joinSuccess: 'Entrou com sucesso no espaço de trabalho',
        select: 'Selecionar Espaço de Trabalho',
        acceptInvitation: 'Aceitar Convite',
      },
    },
    passwordChange: {
      title: 'Alterar Senha',
      subtitle: 'Forneça sua senha antiga e nova.',
      menu: 'Alterar Senha',
      oldPassword: 'Senha Antiga',
      newPassword: 'Nova Senha',
      newPasswordConfirmation: 'Confirmação da Nova Senha',
      button: 'Salvar Senha',
      success: 'Senha alterada com sucesso',
      mustMatch: 'As senhas devem coincidir',
      cancel: 'Cancelar',
    },
    profile: {
      title: 'Perfil',
      subtitle:
        'Seu perfil será compartilhado com outros usuários no seu espaço de trabalho.',
      menu: 'Perfil',
      firstName: 'Primeiro Nome',
      lastName: 'Sobrenome',
      avatars: 'Avatar',
      button: 'Salvar Perfil',
      success: 'Perfil salvo com sucesso',
      cancel: 'Cancelar',
    },
    profileOnboard: {
      title: 'Perfil',
      firstName: 'Primeiro Nome',
      lastName: 'Sobrenome',
      avatars: 'Avatar',
      button: 'Salvar Perfil',
      success: 'Perfil salvo com sucesso',
    },
    signOut: {
      menu: 'Sair',
      button: 'Sair',
      title: 'Sair',
      loading: 'Você está sendo desconectado...',
    },
    errors: {
      invalidApiKey: 'Chave de API inválida ou expirada',
      emailNotFound: 'Email não encontrado',
      userNotFound: 'Desculpe, não reconhecemos suas credenciais',
      wrongPassword: 'Desculpe, não reconhecemos suas credenciais',
      weakPassword: 'Esta senha é muito fraca',
      emailAlreadyInUse: 'Email já está em uso',
      invalidPasswordResetToken:
        'Link para redefinir senha é inválido ou expirou',
      invalidVerifyEmailToken:
        'Link para verificar email é inválido ou expirou',
      wrongOldPassword: 'A senha antiga está errada',
    },
  },

  tenant: {
    switcher: {
      title: 'Espaços de Trabalho',
      placeholder: 'Selecione um Espaço de Trabalho',
      searchPlaceholder: 'Pesquisar espaço de trabalho...',
      searchEmpty: 'Nenhum espaço de trabalho encontrado.',
      create: 'Criar Espaço de Trabalho',
    },

    invite: {
      title: `Aceitar Convite para {0}`,
      message: `Você foi convidado para {0}. Você pode escolher aceitar ou recusar.`,
    },

    form: {
      name: 'Nome',

      new: {
        title: 'Criar Espaço de Trabalho',
        success: 'Espaço de Trabalho criado com sucesso',
      },

      edit: {
        title: 'Configurações do Espaço de Trabalho',
        success: 'Espaço de Trabalho atualizado com sucesso',
      },
    },

    destroy: {
      success: 'Espaço de Trabalho excluído com sucesso',
      confirmTitle: 'Deletar Espaço de Trabalho?',
      confirmDescription:
        'Tem certeza de que deseja excluir o espaço de trabalho {0}? Esta ação é irreversível!',
    },
  },

  membership: {
    dashboardCard: {
      title: 'Usuários',
    },

    showActivity: 'Atividade',

    view: {
      title: 'Ver Usuário',
    },

    list: {
      menu: 'Usuários',
      title: 'Usuários',
      noResults: 'Nenhum usuário encontrado.',
    },

    export: {
      success: 'Usuários exportados com sucesso',
    },

    edit: {
      menu: 'Editar Usuário',
      title: 'Editar Usuário',
      success: 'Usuário atualizado com sucesso',
    },

    new: {
      menu: 'Novo Usuário',
      title: 'Novo Usuário',
      success: 'Usuário criado com sucesso',
    },

    destroyMany: {
      success: 'Usuário(s) deletado(s) com sucesso',
      noSelection: 'Você deve selecionar pelo menos um usuário para deletar.',
      confirmTitle: 'Deletar Usuário(s)?',
      confirmDescription:
        'Tem certeza de que deseja deletar os {0} usuários selecionados?',
    },

    destroy: {
      success: 'Usuário deletado com sucesso',
      noSelection: 'Você deve selecionar pelo menos um usuário para deletar.',
      confirmTitle: 'Deletar Usuário?',
    },

    resendInvitationEmail: {
      button: 'Reenviar Email de Convite',
      success: 'Email de convite reenviado com sucesso',
    },

    fields: {
      avatars: 'Avatar',
      fullName: 'Nome Completo',
      firstName: 'Primeiro Nome',
      lastName: 'Sobrenome',
      email: 'Email',
      roles: 'Funções',
      status: 'Status',
    },

    enumerators: {
      roles: {
        admin: 'Admin',
        custom: 'Custom',
      },

      status: {
        invited: 'Convidado',
        active: 'Ativo',
        disabled: 'Desativado',
      },
    },

    errors: {
      cannotRemoveSelfAdminRole:
        'Você não pode remover seu próprio papel de admin',
      cannotDeleteSelf: 'Você não pode remover sua própria associação',
      notInvited: 'Você não está convidado',
      invalidStatus: `Status inválido: {0}`,
      alreadyMember: `{0} já é um membro`,
      notSameEmail: `Este convite foi enviado para {0}, mas você está logado como {1}. Deseja continuar?`,
    },
  },

  subscription: {
    menu: 'Assinatura',
    title: 'Planos e Preços',
    current: 'Plano Atual',

    subscribe: 'Assinar',
    manage: 'Gerenciar',
    notPlanUser: 'Você não é o gerente desta assinatura.',
    cancelAtPeriodEnd: 'Este plano será cancelado no final do período.',

    plans: {
      free: {
        title: 'Grátis',
        price: 'R$0',
        pricingPeriod: '/mês',
        features: {
          first: 'Primeira descrição do recurso',
          second: 'Segunda descrição do recurso',
          third: 'Terceira descrição do recurso',
        },
      },
      basic: {
        title: 'Básico',
        price: 'R$10',
        pricingPeriod: '/mês',
        features: {
          first: 'Primeira descrição do recurso',
          second: 'Segunda descrição do recurso',
          third: 'Terceira descrição do recurso',
        },
      },
      enterprise: {
        title: 'Empresarial',
        price: 'R$50',
        pricingPeriod: '/mês',
        features: {
          first: 'Primeira descrição do recurso',
          second: 'Segunda descrição do recurso',
          third: 'Terceira descrição do recurso',
        },
      },
    },

    errors: {
      disabled: 'As assinaturas estão desativadas nesta plataforma',
      alreadyExistsActive: 'Já existe uma assinatura ativa',
      stripeNotConfigured: 'As variáveis de ambiente do Stripe estão faltando',
    },
  },

  station: {
    label: 'Station',

    dashboardCard: {
      title: 'Stations',
    },

    list: {
      menu: 'Stations',
      title: 'Stations',
      noResults: 'Nenhum stations encontrado.',
    },

    export: {
      success: 'Stations exportados com sucesso',
    },

    new: {
      menu: 'Novo Station',
      title: 'Novo Station',
      success: 'Station criado com sucesso',
    },

    view: {
      title: 'Ver Station',
    },

    edit: {
      menu: 'Editar Station',
      title: 'Editar Station',
      success: 'Station atualizado com sucesso',
    },

    destroyMany: {
      success: 'Station(s) excluído(s) com sucesso',
      noSelection: 'Você deve selecionar pelo menos um Station para excluir.',
      confirmTitle: 'Excluir Station(s)?',
      confirmDescription:
        'Tem certeza de que deseja excluir os {0} Station(s) selecionados?',
    },

    destroy: {
      success: 'Station excluído com sucesso',
      noSelection: 'Você deve selecionar pelo menos um Station para excluir.',
      confirmTitle: 'Excluir Station?',
    },

    fields: {
      name: 'Name',
      description: 'Description',
      location: 'Location',
      supervisor: 'Supervisor',
      dispensers: 'Dispensers',
      tanks: 'Tanks',
      sales: 'Sales',
      devices: 'Devices',
      createdByMembership: 'Criado Por',
      updatedByMembership: 'Atualizado Por',
      createdAt: 'Criado em',
      updatedAt: 'Atualizado em',
    },

    hints: {
      name: '',
      description: '',
      location: '',
      supervisor: '',
      dispensers: '',
      tanks: '',
      sales: '',
      devices: '',
    },

    enumerators: {

    },
  },

  dispenser: {
    label: 'Dispenser',

    dashboardCard: {
      title: 'Dispensers',
    },

    list: {
      menu: 'Dispensers',
      title: 'Dispensers',
      noResults: 'Nenhum dispensers encontrado.',
    },

    export: {
      success: 'Dispensers exportados com sucesso',
    },

    new: {
      menu: 'Novo Dispenser',
      title: 'Novo Dispenser',
      success: 'Dispenser criado com sucesso',
    },

    view: {
      title: 'Ver Dispenser',
    },

    edit: {
      menu: 'Editar Dispenser',
      title: 'Editar Dispenser',
      success: 'Dispenser atualizado com sucesso',
    },

    destroyMany: {
      success: 'Dispenser(s) excluído(s) com sucesso',
      noSelection: 'Você deve selecionar pelo menos um Dispenser para excluir.',
      confirmTitle: 'Excluir Dispenser(s)?',
      confirmDescription:
        'Tem certeza de que deseja excluir os {0} Dispenser(s) selecionados?',
    },

    destroy: {
      success: 'Dispenser excluído com sucesso',
      noSelection: 'Você deve selecionar pelo menos um Dispenser para excluir.',
      confirmTitle: 'Excluir Dispenser?',
    },

    fields: {
      name: 'Name',
      model: 'Model',
      fuelType: 'FuelType',
      station: 'Station',
      createdByMembership: 'Criado Por',
      updatedByMembership: 'Atualizado Por',
      createdAt: 'Criado em',
      updatedAt: 'Atualizado em',
    },

    hints: {
      name: '',
      model: '',
      fuelType: '',
      station: '',
    },

    enumerators: {
      fuelType: {
        Petrol: 'Petrol',
        Diesel: 'Diesel',
      },
    },
  },

  tank: {
    label: 'Tank',

    dashboardCard: {
      title: 'Tanks',
    },

    list: {
      menu: 'Tanks',
      title: 'Tanks',
      noResults: 'Nenhum tanks encontrado.',
    },

    export: {
      success: 'Tanks exportados com sucesso',
    },

    new: {
      menu: 'Novo Tank',
      title: 'Novo Tank',
      success: 'Tank criado com sucesso',
    },

    view: {
      title: 'Ver Tank',
    },

    edit: {
      menu: 'Editar Tank',
      title: 'Editar Tank',
      success: 'Tank atualizado com sucesso',
    },

    destroyMany: {
      success: 'Tank(s) excluído(s) com sucesso',
      noSelection: 'Você deve selecionar pelo menos um Tank para excluir.',
      confirmTitle: 'Excluir Tank(s)?',
      confirmDescription:
        'Tem certeza de que deseja excluir os {0} Tank(s) selecionados?',
    },

    destroy: {
      success: 'Tank excluído com sucesso',
      noSelection: 'Você deve selecionar pelo menos um Tank para excluir.',
      confirmTitle: 'Excluir Tank?',
    },

    fields: {
      name: 'Name',
      capacity: 'Capacity',
      station: 'Station',
      createdByMembership: 'Criado Por',
      updatedByMembership: 'Atualizado Por',
      createdAt: 'Criado em',
      updatedAt: 'Atualizado em',
    },

    hints: {
      name: '',
      capacity: '',
      station: '',
    },

    enumerators: {

    },
  },

  customer: {
    label: 'Customer',

    dashboardCard: {
      title: 'Customers',
    },

    list: {
      menu: 'Customers',
      title: 'Customers',
      noResults: 'Nenhum customers encontrado.',
    },

    export: {
      success: 'Customers exportados com sucesso',
    },

    new: {
      menu: 'Novo Customer',
      title: 'Novo Customer',
      success: 'Customer criado com sucesso',
    },

    view: {
      title: 'Ver Customer',
    },

    edit: {
      menu: 'Editar Customer',
      title: 'Editar Customer',
      success: 'Customer atualizado com sucesso',
    },

    destroyMany: {
      success: 'Customer(s) excluído(s) com sucesso',
      noSelection: 'Você deve selecionar pelo menos um Customer para excluir.',
      confirmTitle: 'Excluir Customer(s)?',
      confirmDescription:
        'Tem certeza de que deseja excluir os {0} Customer(s) selecionados?',
    },

    destroy: {
      success: 'Customer excluído com sucesso',
      noSelection: 'Você deve selecionar pelo menos um Customer para excluir.',
      confirmTitle: 'Excluir Customer?',
    },

    fields: {
      firstName: 'First Name',
      lastName: 'Last Name',
      otherNames: 'Other Names',
      gender: 'Gender',
      serviceNo: 'ServiceNo',
      entitledCards: 'Entitled Cards',
      status: 'Status',
      rank: 'Rank',
      vehicles: 'Vehicles',
      sales: 'Sales',
      cards: 'Cards',
      vouchers: 'Vouchers',
      createdByMembership: 'Criado Por',
      updatedByMembership: 'Atualizado Por',
      createdAt: 'Criado em',
      updatedAt: 'Atualizado em',
    },

    hints: {
      firstName: 'First Name',
      lastName: 'Last Name',
      otherNames: 'Other Names',
      gender: '',
      serviceNo: '',
      entitledCards: '',
      status: '',
      rank: '',
      vehicles: '',
      sales: '',
      cards: '',
      vouchers: '',
    },

    enumerators: {
      gender: {
        Male: 'Male',
        Female: 'Female',
      },

      status: {
        active: 'Active',
        flagged: 'Flagged',
        suspended: 'Suspended',
        deactivated: 'Deactivated',
      },
    },
  },

  vehicle: {
    label: 'Vehicle',

    dashboardCard: {
      title: 'Vehicles',
    },

    list: {
      menu: 'Vehicles',
      title: 'Vehicles',
      noResults: 'Nenhum vehicles encontrado.',
    },

    export: {
      success: 'Vehicles exportados com sucesso',
    },

    new: {
      menu: 'Novo Vehicle',
      title: 'Novo Vehicle',
      success: 'Vehicle criado com sucesso',
    },

    view: {
      title: 'Ver Vehicle',
    },

    edit: {
      menu: 'Editar Vehicle',
      title: 'Editar Vehicle',
      success: 'Vehicle atualizado com sucesso',
    },

    destroyMany: {
      success: 'Vehicle(s) excluído(s) com sucesso',
      noSelection: 'Você deve selecionar pelo menos um Vehicle para excluir.',
      confirmTitle: 'Excluir Vehicle(s)?',
      confirmDescription:
        'Tem certeza de que deseja excluir os {0} Vehicle(s) selecionados?',
    },

    destroy: {
      success: 'Vehicle excluído com sucesso',
      noSelection: 'Você deve selecionar pelo menos um Vehicle para excluir.',
      confirmTitle: 'Excluir Vehicle?',
    },

    fields: {
      make: 'Make',
      regNo: 'RegNo',
      cc: 'Cubic Capacity (CC)',
      fullTank: 'Full Tank Capacity',
      approved: 'Approved',
      customer: 'Customer',
      approvedBy: 'Approved By',
      vouchers: 'Vouchers',
      createdByMembership: 'Criado Por',
      updatedByMembership: 'Atualizado Por',
      createdAt: 'Criado em',
      updatedAt: 'Atualizado em',
    },

    hints: {
      make: '',
      regNo: '',
      cc: 'Cubic Capacity (CC)',
      fullTank: 'Full Tank Capacity',
      approved: 'Is Approved',
      customer: '',
      approvedBy: '',
      vouchers: '',
    },

    enumerators: {

    },
  },

  sale: {
    label: 'Sale',

    dashboardCard: {
      title: 'Sales',
    },

    list: {
      menu: 'Sales',
      title: 'Sales',
      noResults: 'Nenhum sales encontrado.',
    },

    export: {
      success: 'Sales exportados com sucesso',
    },

    new: {
      menu: 'Novo Sale',
      title: 'Novo Sale',
      success: 'Sale criado com sucesso',
    },

    view: {
      title: 'Ver Sale',
    },

    edit: {
      menu: 'Editar Sale',
      title: 'Editar Sale',
      success: 'Sale atualizado com sucesso',
    },

    destroyMany: {
      success: 'Sale(s) excluído(s) com sucesso',
      noSelection: 'Você deve selecionar pelo menos um Sale para excluir.',
      confirmTitle: 'Excluir Sale(s)?',
      confirmDescription:
        'Tem certeza de que deseja excluir os {0} Sale(s) selecionados?',
    },

    destroy: {
      success: 'Sale excluído com sucesso',
      noSelection: 'Você deve selecionar pelo menos um Sale para excluir.',
      confirmTitle: 'Excluir Sale?',
    },

    fields: {
      date1: 'Date',
      fuelType: 'Fuel Type',
      litres: 'Litres',
      rate: 'Rate',
      total: 'Total',
      paymode: 'Paymode',
      cashAmount: 'Cash Amount',
      mpesaAmount: 'Mpesa Amount',
      invoiceAmount: 'Invoice Amount',
      customer: 'Customer',
      station: 'Station',
      createdByMembership: 'Criado Por',
      updatedByMembership: 'Atualizado Por',
      createdAt: 'Criado em',
      updatedAt: 'Atualizado em',
    },

    hints: {
      date1: 'Date',
      fuelType: '',
      litres: '',
      rate: '',
      total: '',
      paymode: '',
      cashAmount: '',
      mpesaAmount: '',
      invoiceAmount: '',
      customer: '',
      station: '',
    },

    enumerators: {
      fuelType: {
        Diesel: 'Diesel',
        Petrol: 'Petrol',
      },

      paymode: {
        Cash: 'Cash',
        MPesa: 'MPesa',
        Invoice: 'Invoice',
        Cash_MPesa: 'Cash_MPesa',
        Cash_MPesa_Invoice: 'Cash_MPesa_Invoice',
        Cash_Invoice: 'Cash_Invoice',
        MPesa_Invoice: 'MPesa_Invoice',
      },
    },
  },

  card: {
    label: 'Card',

    dashboardCard: {
      title: 'Cards',
    },

    list: {
      menu: 'Cards',
      title: 'Cards',
      noResults: 'Nenhum cards encontrado.',
    },

    export: {
      success: 'Cards exportados com sucesso',
    },

    new: {
      menu: 'Novo Card',
      title: 'Novo Card',
      success: 'Card criado com sucesso',
    },

    view: {
      title: 'Ver Card',
    },

    edit: {
      menu: 'Editar Card',
      title: 'Editar Card',
      success: 'Card atualizado com sucesso',
    },

    destroyMany: {
      success: 'Card(s) excluído(s) com sucesso',
      noSelection: 'Você deve selecionar pelo menos um Card para excluir.',
      confirmTitle: 'Excluir Card(s)?',
      confirmDescription:
        'Tem certeza de que deseja excluir os {0} Card(s) selecionados?',
    },

    destroy: {
      success: 'Card excluído com sucesso',
      noSelection: 'Você deve selecionar pelo menos um Card para excluir.',
      confirmTitle: 'Excluir Card?',
    },

    fields: {
      cardNo: 'Card No',
      isActive: 'Is Active',
      issueDate: 'Issue Date',
      deactivationDate: 'Deactivation Date',
      customer: 'Customer',
      createdByMembership: 'Criado Por',
      updatedByMembership: 'Atualizado Por',
      createdAt: 'Criado em',
      updatedAt: 'Atualizado em',
    },

    hints: {
      cardNo: '',
      isActive: '',
      issueDate: '',
      deactivationDate: '',
      customer: '',
    },

    enumerators: {

    },
  },

  product: {
    label: 'Product',

    dashboardCard: {
      title: 'Products',
    },

    list: {
      menu: 'Products',
      title: 'Products',
      noResults: 'Nenhum products encontrado.',
    },

    export: {
      success: 'Products exportados com sucesso',
    },

    new: {
      menu: 'Novo Product',
      title: 'Novo Product',
      success: 'Product criado com sucesso',
    },

    view: {
      title: 'Ver Product',
    },

    edit: {
      menu: 'Editar Product',
      title: 'Editar Product',
      success: 'Product atualizado com sucesso',
    },

    destroyMany: {
      success: 'Product(s) excluído(s) com sucesso',
      noSelection: 'Você deve selecionar pelo menos um Product para excluir.',
      confirmTitle: 'Excluir Product(s)?',
      confirmDescription:
        'Tem certeza de que deseja excluir os {0} Product(s) selecionados?',
    },

    destroy: {
      success: 'Product excluído com sucesso',
      noSelection: 'Você deve selecionar pelo menos um Product para excluir.',
      confirmTitle: 'Excluir Product?',
    },

    fields: {
      name: 'Name',
      price: 'Price',
      receipts: 'Receipts',
      createdByMembership: 'Criado Por',
      updatedByMembership: 'Atualizado Por',
      createdAt: 'Criado em',
      updatedAt: 'Atualizado em',
    },

    hints: {
      name: '',
      price: '',
      receipts: '',
    },

    enumerators: {

    },
  },

  device: {
    label: 'Device',

    dashboardCard: {
      title: 'Devices',
    },

    list: {
      menu: 'Devices',
      title: 'Devices',
      noResults: 'Nenhum devices encontrado.',
    },

    export: {
      success: 'Devices exportados com sucesso',
    },

    new: {
      menu: 'Novo Device',
      title: 'Novo Device',
      success: 'Device criado com sucesso',
    },

    view: {
      title: 'Ver Device',
    },

    edit: {
      menu: 'Editar Device',
      title: 'Editar Device',
      success: 'Device atualizado com sucesso',
    },

    destroyMany: {
      success: 'Device(s) excluído(s) com sucesso',
      noSelection: 'Você deve selecionar pelo menos um Device para excluir.',
      confirmTitle: 'Excluir Device(s)?',
      confirmDescription:
        'Tem certeza de que deseja excluir os {0} Device(s) selecionados?',
    },

    destroy: {
      success: 'Device excluído com sucesso',
      noSelection: 'Você deve selecionar pelo menos um Device para excluir.',
      confirmTitle: 'Excluir Device?',
    },

    fields: {
      deviceId: 'Device Id',
      description: 'Description',
      station: 'Station',
      createdByMembership: 'Criado Por',
      updatedByMembership: 'Atualizado Por',
      createdAt: 'Criado em',
      updatedAt: 'Atualizado em',
    },

    hints: {
      deviceId: '',
      description: '',
      station: '',
    },

    enumerators: {

    },
  },

  voucher: {
    label: 'Voucher',

    dashboardCard: {
      title: 'Vouchers',
    },

    list: {
      menu: 'Vouchers',
      title: 'Vouchers',
      noResults: 'Nenhum vouchers encontrado.',
    },

    export: {
      success: 'Vouchers exportados com sucesso',
    },

    new: {
      menu: 'Novo Voucher',
      title: 'Novo Voucher',
      success: 'Voucher criado com sucesso',
    },

    view: {
      title: 'Ver Voucher',
    },

    edit: {
      menu: 'Editar Voucher',
      title: 'Editar Voucher',
      success: 'Voucher atualizado com sucesso',
    },

    destroyMany: {
      success: 'Voucher(s) excluído(s) com sucesso',
      noSelection: 'Você deve selecionar pelo menos um Voucher para excluir.',
      confirmTitle: 'Excluir Voucher(s)?',
      confirmDescription:
        'Tem certeza de que deseja excluir os {0} Voucher(s) selecionados?',
    },

    destroy: {
      success: 'Voucher excluído com sucesso',
      noSelection: 'Você deve selecionar pelo menos um Voucher para excluir.',
      confirmTitle: 'Excluir Voucher?',
    },

    fields: {
      date1: 'Date',
      voucherNo: 'Voucher No',
      indentNo: 'Indent No',
      approvedBy: 'Approved By',
      qty: 'Qty',
      amount: 'Amount',
      customer: 'Customer',
      vehicle: 'Vehicle',
      createdByMembership: 'Criado Por',
      updatedByMembership: 'Atualizado Por',
      createdAt: 'Criado em',
      updatedAt: 'Atualizado em',
    },

    hints: {
      date1: '',
      voucherNo: '',
      indentNo: '',
      approvedBy: '',
      qty: '',
      amount: '',
      customer: '',
      vehicle: '',
    },

    enumerators: {

    },
  },

  materialReceipt: {
    label: 'Material Receipt',

    dashboardCard: {
      title: 'Material Receipts',
    },

    list: {
      menu: 'Material Receipts',
      title: 'Material Receipts',
      noResults: 'Nenhum material receipts encontrado.',
    },

    export: {
      success: 'Material Receipts exportados com sucesso',
    },

    new: {
      menu: 'Novo Material Receipt',
      title: 'Novo Material Receipt',
      success: 'Material Receipt criado com sucesso',
    },

    view: {
      title: 'Ver Material Receipt',
    },

    edit: {
      menu: 'Editar Material Receipt',
      title: 'Editar Material Receipt',
      success: 'Material Receipt atualizado com sucesso',
    },

    destroyMany: {
      success: 'Material Receipt(s) excluído(s) com sucesso',
      noSelection: 'Você deve selecionar pelo menos um Material Receipt para excluir.',
      confirmTitle: 'Excluir Material Receipt(s)?',
      confirmDescription:
        'Tem certeza de que deseja excluir os {0} Material Receipt(s) selecionados?',
    },

    destroy: {
      success: 'Material Receipt excluído com sucesso',
      noSelection: 'Você deve selecionar pelo menos um Material Receipt para excluir.',
      confirmTitle: 'Excluir Material Receipt?',
    },

    fields: {
      date1: 'Date',
      supplier: 'Supplier',
      quantity: 'Quantity',
      price: 'Price',
      total: 'Total',
      product: 'Product',
      createdByMembership: 'Criado Por',
      updatedByMembership: 'Atualizado Por',
      createdAt: 'Criado em',
      updatedAt: 'Atualizado em',
    },

    hints: {
      date1: '',
      supplier: '',
      quantity: '',
      price: '',
      total: '',
      product: '',
    },

    enumerators: {

    },
  },

  rank: {
    label: 'Rank',

    dashboardCard: {
      title: 'Ranks',
    },

    list: {
      menu: 'Ranks',
      title: 'Ranks',
      noResults: 'Nenhum ranks encontrado.',
    },

    export: {
      success: 'Ranks exportados com sucesso',
    },

    new: {
      menu: 'Novo Rank',
      title: 'Novo Rank',
      success: 'Rank criado com sucesso',
    },

    view: {
      title: 'Ver Rank',
    },

    edit: {
      menu: 'Editar Rank',
      title: 'Editar Rank',
      success: 'Rank atualizado com sucesso',
    },

    destroyMany: {
      success: 'Rank(s) excluído(s) com sucesso',
      noSelection: 'Você deve selecionar pelo menos um Rank para excluir.',
      confirmTitle: 'Excluir Rank(s)?',
      confirmDescription:
        'Tem certeza de que deseja excluir os {0} Rank(s) selecionados?',
    },

    destroy: {
      success: 'Rank excluído com sucesso',
      noSelection: 'Você deve selecionar pelo menos um Rank para excluir.',
      confirmTitle: 'Excluir Rank?',
    },

    fields: {
      name: 'Name',
      description: 'Description',
      customers: 'Customers',
      createdByMembership: 'Criado Por',
      updatedByMembership: 'Atualizado Por',
      createdAt: 'Criado em',
      updatedAt: 'Atualizado em',
    },

    hints: {
      name: '',
      description: '',
      customers: '',
    },

    enumerators: {

    },
  },

  auditLog: {
    list: {
      menu: 'Logs de Auditoria',
      title: 'Logs de Auditoria',
      noResults: 'Nenhum log de auditoria encontrado.',
    },

    changesDialog: {
      title: 'Log de Auditoria',
      changes: 'Mudanças',
      noChanges: 'Não há mudanças neste log.',
    },

    export: {
      success: 'Logs de Auditoria exportados com sucesso',
    },

    fields: {
      timestamp: 'Data',
      entityName: 'Entidade',
      entityNames: 'Entidades',
      entityId: 'ID da Entidade',
      operation: 'Operação',
      operations: 'Operações',
      membership: 'Usuário',
      apiKey: 'Chave da API',
      apiEndpoint: 'Endpoint da API',
      apiHttpResponseCode: 'Status da API',
      transactionId: 'ID da Transação',
    },

    enumerators: {
      operation: {
        SI: 'Entrou',
        SO: 'Saiu',
        SU: 'Cadastrou-se',
        PRR: 'Solicitou Redefinição de Senha',
        PRC: 'Confirmou Redefinição de Senha',
        PC: 'Alterou Senha',
        VER: 'Solicitou Verificação de Email',
        VEC: 'Confirmou Verificação de Email',
        C: 'Criou',
        U: 'Atualizou',
        D: 'Excluiu',
        AG: 'API Get',
        APO: 'API Post',
        APU: 'API Put',
        AD: 'API Delete',
      },
    },

    dashboardCard: {
      activityChart: 'Atividade',
      activityList: 'Atividade Recente',
    },

    readableOperations: {
      SI: '{0} entrou',
      SU: '{0} se registrou',
      PRR: '{0} solicitou redefinição de senha',
      PRC: '{0} confirmou redefinição de senha',
      PC: '{0} alterou a senha',
      VER: '{0} solicitou verificação de email',
      VEC: '{0} verificou o email',
      C: '{0} criou {1} {2}',
      U: '{0} atualizou {1} {2}',
      D: '{0} excluiu {1} {2}',
    },
  },

  recaptcha: {
    errors: {
      disabled:
        'O reCAPTCHA está desativado nesta plataforma. Verificação ignorada.',
      invalid: 'reCAPTCHA inválido',
    },
  },

  emails: {
    passwordResetEmail: {
      subject: `Redefina sua senha para {0}`,
      content: `<p>Olá,</p> <p>Siga este link para redefinir a senha da sua conta {0}.</p> <p><a href="{1}">{1}</a></p> <p>Se você não solicitou a redefinição de senha, pode ignorar este e-mail.</p> <p>Obrigado,</p> <p>Equipe {0}</p>`,
    },
    verifyEmailEmail: {
      subject: `Verifique seu e-mail para {0}`,
      content: `<p>Olá,</p><p>Siga este link para verificar seu endereço de e-mail.</p><p><a href="{1}">{1}</a></p><p>Se você não solicitou essa verificação, pode ignorar este e-mail.</p> <p>Obrigado,</p> <p>Equipe {0}</p>`,
    },
    invitationEmail: {
      singleTenant: {
        subject: `Você foi convidado para {0}`,
        content: `<p>Olá,</p> <p>Você foi convidado para {0}.</p> <p>Siga este link para se registrar.</p> <p><a href="{1}">{1}</a></p> <p>Obrigado,</p> <p>Equipe {0}</p>`,
      },
      multiTenant: {
        subject: `Você foi convidado para {1} em {0}`,
        content: `<p>Olá,</p> <p>Você foi convidado para {2}.</p> <p>Siga este link para se registrar.</p> <p><a href="{1}">{1}</a></p> <p>Obrigado,</p> <p>Equipe {0}</p>`,
      },
    },
    errors: {
      emailNotConfigured: 'Variáveis de ambiente de e-mail estão faltando',
    },
  },
};

export default dictionary;
