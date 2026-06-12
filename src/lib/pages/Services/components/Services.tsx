import {
  Box,
  Stack,
  Button,
  Image,
  Heading,
  Text,
  Flex,
} from '@chakra-ui/react';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { ServiceFeatureIcon } from '~/lib/components/Icons/Icons';

const Services = ({
  onActiveChange,
}: {
  onActiveChange: (type: string) => void;
}) => {
  const servicesData = [
    {
      title: 'risk assessment',
      description:
        'Identify potential legal, financial, and ownership risks associated with a property before making a purchase or investment decision. Evaluate the financial, environmental, and structural viability of your investment. Get a clear risk score and professional recommendation before wire transfer day.',
      features: [
        'Ownership verification',
        'Red flag identification',
        'Property history review',
        'Investment risk insights',
      ],
      type: 'risk-assessment',
      image: '/assets/images/service1.jpg',
    },
    {
      title: 'due dilligence',
      description:
        'Conduct a comprehensive background review of a property to ensure authenticity, compliance, and investment safety. A deep dive into the history of the property. We verify planning permissions, government zoning laws, and historical context so you don’t accidentally buy committed land.',
      features: [
        'Property background checks',
        'Ownership consistency review',
        'Document validation',
        'Property status investigation',
      ],
      type: 'due-dilligence',
      image: '/assets/images/service2.jpg',
    },
    {
      title: 'Title Search & Verification',
      description:
        'Verify land and property titles to confirm legitimacy and reduce the risk of disputes or fraud. Ensure the seller actually owns the land. We cross-verify property titles with government registries to uncover hidden disputes, liens, or fraudulent ownership claims.',
      features: [
        'Title authenticity checks',
        'Government registry verification',
        'Ownership validation',
        'Encumbrance checks',
      ],
      type: 'title-verification',
      image: '/assets/images/service3.jpg',
    },
    {
      title: 'Documents Review',
      description:
        'Get a Legal Expert’s opinion of Contract of Sale, Deeds and Agreements before you sign',
      features: [
        'Legal document review',
        'Identification of risky clauses',
        'Ownership consistency checks',
        'Legal observations and recommendations',
        'Professional legal feedback before signing',
      ],
      type: 'documents-review',
      image: '/assets/images/service4.jpg',
    },
  ];
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            onActiveChange(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -75% 0px',
        threshold: 0,
      }
    );

    servicesData.forEach((service) => {
      const el = document.getElementById(service.type);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [onActiveChange]);

  return (
    <Box w={['full', '56%']} px={['16px', 0]}>
      <Stack spacing="40px">
        {servicesData?.map((service) => (
          <Box key={service.type} id={service.type}>
            <Stack spacing="16px">
              <Image
                src={service.image}
                alt={`${service.title} image`}
                w="full"
                h={['400px', '420px']}
                rounded="20px"
                objectFit="cover"
              />
              <Heading
                textTransform="capitalize"
                fontWeight={500}
                fontSize={[25, 30]}
                color="brand.400"
              >
                {service?.title}
              </Heading>
              <Text fontWeight={500} fontSize={[15, 16]}>
                {service?.description}
              </Text>
              <Heading fontSize={16}>What’s included:</Heading>
              <Stack spacing="8px">
                {service?.features?.map((feature) => (
                  <Flex alignItems="center" gap="12px">
                    <ServiceFeatureIcon />{' '}
                    <Text fontWeight={500} fontSize={[14, 15]}>
                      {feature}
                    </Text>
                  </Flex>
                ))}
              </Stack>
              <Link href={`/services/request?type=${service?.type}`}>
                <Button
                  rounded="50px"
                  w="fit-content"
                  fontWeight={700}
                  fontSize={15}
                  bg="brand.400"
                  color="bg.200"
                >
                  Request Service
                </Button>
              </Link>
            </Stack>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default Services;
