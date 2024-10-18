<template lang="html">
    <TabView androidTabsPosition="bottom">
        <!-- Page d'accueil -->
        <TabViewItem title="Accueil" iconSource="~/images/acceuil.png">
            <Frame id="items">
                <Acceuil/>
            </Frame>
        </TabViewItem>

        <!-- Page de recherche -->
        <TabViewItem title="Explorer" iconSource="~/images/cherche.png">
            <Frame id="search">
                <Search/>
            </Frame>
        </TabViewItem>

        <!-- Page panier -->
        <TabViewItem title="Panier" iconSource="~/images/panie.png">
            <Frame id="panier">
                <Panier/>
            </Frame>
        </TabViewItem>

        <!-- Page favoris -->
        <TabViewItem title="Favoris" iconSource="~/images/favori.png">
            <Frame id="favoris">
                <Favoris/>
            </Frame>
        </TabViewItem>

        <!-- Page menu -->
        <TabViewItem title="Menu" iconSource="~/images/menue.png">
            <Frame id="menu">
                <Menu/>
            </Frame>
        </TabViewItem>
    </TabView>
</template>

<script>
  import Favoris from './Favoris';//les pages a changer
  import Acceuil from './Acceuil';
  import Menu from './Menu';
  import Panier from './Panier';
  import Search from './Search';

  export default {
    components: {
      Favoris,
      Acceuil,
      Menu,
      Panier,
      Search
    }
  };
</script>

