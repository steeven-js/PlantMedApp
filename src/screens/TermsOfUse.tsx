import React from 'react';

import { View, Text, ScrollView, Platform } from 'react-native';

import { text } from '@src/text';
import { utils } from '@src/utils';
import { custom } from '@src/custom';
import { theme } from '@src/constants';
import { components } from '@src/components';

const terms = [
  {
    id: 1,
    title: "Date d'entrée en vigueur : 28 Juin 2024",
    description:
      "Les présentes Conditions Générales d'Utilisation (CGU) régissent l'utilisation de l'application mobile PlantMed, dédiée aux plantes médicinales. En utilisant l'application, vous acceptez d'être lié par ces CGU.",
  },
  {
    id: 2,
    title: "Objet de l'application",
    description:
      "PlantMed est une application mobile fournissant des informations sur les plantes médicinales, leurs propriétés et leurs utilisations traditionnelles. L'application est destinée à un usage informatif uniquement et ne remplace en aucun cas les conseils d'un professionnel de santé qualifié.",
  },
  {
    id: 3,
    title: "Utilisation de l'application",
    description:
      "Vous vous engagez à utiliser l'application conformément aux lois en vigueur et à ces CGU. Il est interdit d'utiliser l'application à des fins illégales ou non autorisées. Vous êtes responsable de la confidentialité de votre compte et de vos informations d'identification.",
  },
  {
    id: 4,
    title: 'Contenu et propriété intellectuelle',
    description:
      "Tout le contenu présent dans l'application, y compris les textes, images, et logos, est protégé par les droits de propriété intellectuelle. Vous n'êtes pas autorisé à reproduire, distribuer, ou modifier ce contenu sans autorisation expresse.",
  },
  {
    id: 5,
    title: 'Limitation de responsabilité',
    description:
      "Les informations fournies par l'application sont à titre indicatif seulement. Nous ne garantissons pas l'exactitude, l'exhaustivité ou l'actualité de ces informations. L'utilisation de ces informations se fait à vos propres risques. Consultez toujours un professionnel de santé avant d'utiliser des plantes médicinales.",
  },
  {
    id: 6,
    title: 'Modifications des CGU',
    description:
      "Nous nous réservons le droit de modifier ces CGU à tout moment. Les modifications prendront effet dès leur publication dans l'application. Il est de votre responsabilité de consulter régulièrement les CGU.",
  },
  {
    id: 7,
    title: 'Résiliation',
    description:
      "Nous nous réservons le droit de suspendre ou de résilier votre accès à l'application en cas de violation de ces CGU ou pour toute autre raison à notre discrétion.",
  },
  {
    id: 8,
    title: 'Loi applicable',
    description:
      'Ces CGU sont régies par les lois en vigueur dans votre pays de résidence. Tout litige relatif à ces CGU sera soumis à la juridiction compétente de votre lieu de résidence.',
  },
  {
    id: 9,
    title: 'Contact',
    description:
      "Pour toute question concernant ces CGU ou l'utilisation de l'application, veuillez nous contacter à contact@jsprod.com.",
  },
  {
    id: 10,
    title: 'Abonnement Premium',
    description:
      "Notre application offre un abonnement Premium au prix de 1,99 € par mois. Cet abonnement se renouvelle automatiquement à la fin de chaque période mensuelle, sauf annulation de votre part. L'abonnement Premium donne accès à des fiches détaillées sur plus de 100 plantes médicinales, des recettes exclusives, des conseils personnalisés, et des mises à jour régulières. Le paiement sera prélevé sur votre compte iTunes à la confirmation de l'achat.",
  },
  {
    id: 11,
    title: "Gestion de l'abonnement",
    description:
      "Vous pouvez gérer votre abonnement et désactiver le renouvellement automatique en accédant aux paramètres de votre compte après l'achat. L'annulation de l'abonnement en cours prendra effet à la fin de la période d'abonnement en cours. Vous continuerez à avoir accès aux fonctionnalités Premium jusqu'à la fin de la période payée.",
  },
  {
    id: 12,
    title: "Modifications et utilisation de l'abonnement",
    description:
      "Nous nous réservons le droit de modifier le prix de l'abonnement. Toute modification de prix prendra effet au début du prochain cycle de facturation. L'abonnement Premium est réservé à un usage personnel et non commercial. Il ne peut être partagé ou transféré.",
  },
];

const TermsOfUse: React.FC = () => {
  const renderHeader = (): JSX.Element => {
    return <components.Header goBackIcon={true} title="Conditions d'utilisation" />;
  };

  const renderContent = (): JSX.Element => {
    return (
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
          flexGrow: 1,
          paddingTop: utils.responsiveHeight(40),
          paddingBottom: utils.responsiveHeight(20),
        }}
      >
        {terms.map((item, index) => {
          return (
            <View
              key={item.id.toString()}
              style={{
                marginBottom: utils.responsiveHeight(40),
              }}
            >
              <text.H5 style={{ marginBottom: utils.responsiveHeight(10) }}>
                {index + 1 + '. ' + item.title}
              </text.H5>
              <Text
                style={{
                  ...theme.fonts.DM_Sans_400Regular,
                  fontSize: Platform.OS === 'ios' ? 14 : 12,
                  lineHeight: Platform.OS === 'ios' ? 14 * 1.7 : 12 * 1.7,
                  color: theme.colors.textColor,
                }}
              >
                {item.description}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    );
  };

  return (
    <custom.ImageBackground
      style={{ flex: 1 }}
      resizeMode="stretch"
      source={require('@src/assets/bg/02.png')}
    >
      <custom.SafeAreaView
        insets={['top', 'bottom']}
        containerStyle={{ backgroundColor: theme.colors.transparent }}
      >
        {renderHeader()}
        {renderContent()}
      </custom.SafeAreaView>
    </custom.ImageBackground>
  );
};

export default TermsOfUse;
