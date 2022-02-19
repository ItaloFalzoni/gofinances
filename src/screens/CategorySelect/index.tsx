import React from "react";
import { FlatList } from "react-native-gesture-handler";
import { categories } from "../../utils/categories";

import { Button } from "../../Components/Form/Button";

import { Container, Header, Title, Category, Icon, Name, Separator, Footer } from "./styles";

interface Category {
  key: string;
  name: string;
}

interface Props {
  category: Category;
  setCategory: (category: Category) => void;
  closeSelectCategory: () => void;
}

export function CategorySelect({ category, setCategory, closeSelectCategory }: Props) {
  function handleCategorySelect(item: Category) {
    setCategory(item);
  }

  return (
    <Container>
      <Header>
        <Title>Título</Title>
      </Header>

      <FlatList
        data={categories}
        style={{ flex: 1, width: "100%" }}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <Category onPress={() => handleCategorySelect(item)} isActive={category.key === item.key}>
            <Icon name={item.icon} />
            <Name>{item.name}</Name>
          </Category>
        )}
        ItemSeparatorComponent={() => <Separator />}
      />

      <Footer>
        <Button title="Selecionar" onPress={closeSelectCategory} />
      </Footer>
    </Container>
  );
}
