package com.example.ETSystem.lookup;

import com.example.ETSystem.productData.ProductData;
import com.example.ETSystem.productData.ProductDataService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.fasterxml.jackson.databind.node.TextNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@RestController
@RequestMapping("api/lookup/barcode")
@CrossOrigin(origins = "http://localhost:3000")
public class BarcodeAPI{
	private static final List<String> opffLabels = List.of(
			"generic_name", "generic_name_en",
			"name", "title", "label",
			"product_name", "product_name_en", "product_name_en_imported"
	);
	
	private final RestTemplate openFoodFactsTemplate = new RestTemplate();

	private final ProductDataService productDataService;

	@Autowired
	public BarcodeAPI(ProductDataService productDataService) {
		this.productDataService = productDataService;
	}

	@GetMapping("/lookup-by-gtin/{gtin}")
	public ProductData lookupByGtin(@PathVariable String gtin){
		//Now returns the complete ProductData object
		return productDataService.getProductData(gtin);
	}

	//Deprecated
	@GetMapping("/lookup-by-gtin-old/{gtin}")
	public BarcodeData lookupByGtinOld(@PathVariable long gtin) throws JsonProcessingException{
		String response;
		try {
			response = openFoodFactsTemplate.getForObject(
					"https://world.openfoodfacts.org/api/v2/product/{id}.json",
					String.class,
					gtin
			);
		} catch (RestClientException ignored){
			return BarcodeData.INVALID;
		}
		if(response == null)
			return BarcodeData.INVALID;
		
		String name = null;
		JsonNode data = new ObjectMapper().readTree(response);
		if(data.get("product") instanceof ObjectNode productsNode)
			for(String label : opffLabels)
				if(productsNode.get(label) instanceof TextNode tn){
					name = tn.asText();
					break;
				}
		
		if(name == null)
			return BarcodeData.INVALID;
		return new BarcodeData(true, name, null, gtin);
	}
}