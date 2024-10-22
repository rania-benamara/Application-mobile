 <template>
    <Page actionBarHidden="true">
        <GridLayout rows="*, auto" columns="*, *, *, *, *">
            <TabView androidTabsPosition="bottom" class="custom-tabview" row="1" columnSpan="5">
                <TabViewItem title="Acceuil" iconSource="~/images/acceuil.png" row="0" col="0">
                    <StackLayout @tap="" orientation="horizontal">
                    </StackLayout>
                </TabViewItem>
                <TabViewItem title="Explorer" iconSource="~/images/chercher.png" row="0" col="1">
                    <StackLayout @tap="" orientation="horizontal">
                    </StackLayout>
                </TabViewItem>
                <TabViewItem title="Panier" iconSource="~/images/panier.png" row="0" col="2">
                    <StackLayout @tap="" orientation="horizontal">
                    </StackLayout>
                </TabViewItem>
                <TabViewItem title="Favoris" iconSource="~/images/favoris.png" row="0" col="3">
                    <StackLayout @tap="" orientation="horizontal">
                    </StackLayout>
                </TabViewItem>
                <TabViewItem title="Menu" iconSource="~/images/menu.png" row="0" col="4">
                    <StackLayout @tap="" orientation="horizontal">
                    </StackLayout>
                </TabViewItem>
            </TabView>
        </GridLayout>
    </Page>
</template>
<style scoped>
.custom-tabview {
  border-width: 0;
  separator-color: transparent;
}
</style>
