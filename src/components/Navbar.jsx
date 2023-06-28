import React, { useEffect, useState } from 'react';
import {
	Flex,
	Box,
	Heading,
	Spacer,
	ButtonGroup,
	Button,
	Input,
	Card,
	Image,
	Grid,
} from '@chakra-ui/react';
import axios from 'axios';

const Navbar = () => {
	const [query, setQuery] = useState('Mountain');
	const [search, setSearch] = useState(query);
	const [result, setResult] = useState([]);
	const YOUR_ACCESS_KEY = 'jzTP697mVMIToaU8-g0sztDTUEvmNJHQ6jemQ2P8Das';
	useEffect(() => {
		axios
			.get(`https://api.unsplash.com/search/photos`, {
				params: {
					query: search,
				},
				headers: {
					Authorization: `Client-ID ${YOUR_ACCESS_KEY}`,
				},
			})
			.then((res) => {
				console.log(res.data.results);
				setResult(res.data.results);
			});
	}, [search]);
	const handlerSearch = () => {
		setSearch(query);
	};

	return (
		<>
			<div style={{ margin: '10px' }}>
				<Flex minWidth="max-content" alignItems="center" gap="2">
					<Box p="2">
						<Heading size="md">GeekGellery</Heading>
					</Box>
					<Spacer />
					<ButtonGroup gap="2">
						<Input
							htmlSize={20}
							width="auto"
							placeholder="Search"
							onChange={(e) => {
								setQuery(e.target.value);
							}}
						/>

						<Button colorScheme="teal" onClick={handlerSearch}>
							Search
						</Button>
					</ButtonGroup>
				</Flex>
			</div>
			<Grid templateColumns="repeat(3, 1fr)" gap={9} margin={20}>
				{result.map((element) => {
					return (
						<Card
							maxW="lg"
							height={400}
							borderRadius={20}
							boxShadow="0 0 10px black"
						>
							<Image
								height={400}
								width={400}
								borderRadius={20}
								objectFit="cover"
								src={element.urls.full}
								alt="Chakra UI"
							/>
						</Card>
					);
				})}
			</Grid>
		</>
	);
}
export default Navbar;
