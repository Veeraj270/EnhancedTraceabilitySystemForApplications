package com.example.ETSystem.product;


import com.example.ETSystem.timeline.TimelineData;
import com.example.ETSystem.timeline.TimelineEvent;
import com.example.ETSystem.timeline.TimelineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.config.ConfigDataResourceNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@Component
public class ProductService{

	private final ProductRepository productRepository;
	private final TimelineService timelineService;

	@Autowired
	public ProductService(ProductRepository productRepository, TimelineService timelineService){
		this.productRepository = productRepository;
		this.timelineService = timelineService;
	}

	public List<Product> getProducts(){
		return productRepository.findAll();
	}

	public void addNewProduct(Product product){
		productRepository.save(product);
	}

	public List<Product> getProductIntermediaries(long id){
		// Return all (transitive) intermediaries of this product
		List<Product> intermediaries = new ArrayList<>();
		productRepository.findById(id).ifPresent(product -> recursiveSearch(product, intermediaries, null));
		return intermediaries;
	}

	public void recursiveSearch(Product product, List<Product> intermediaries, Product parent){
		for(long id : product.getIntermediaryIds())
			productRepository.findById(id).ifPresent(value -> recursiveSearch(value, intermediaries, product));

		intermediaries.add(product);
		if(parent != null)
			product.setParentID(parent.getId());
	}

	public List<TimelineData> getProductHistory(long id){
		return productRepository.findById(id)
				.map(value -> timelineService.findAllByProductSorted(value).map(TimelineEvent::asData).toList())
				.orElseGet(List::of);
	}

    public Product getProductByID(Long id){
        if(productRepository.findById(id).isPresent()){
            return productRepository.findById(id).get();
        }
        else{
            throw new ResponseStatusException(NOT_FOUND, "Unable to find product");
        }
    }

    public Product editProduct(Long id, Product product){
        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
        existingProduct.setLabel(product.getLabel());
        existingProduct.setParentID(product.getParentID());
        existingProduct.setIntermediaryIds(product.getIntermediaryIds());
        existingProduct.setMaxQuantity(product.getMaxQuantity());
        existingProduct.setCurrentQuantity(product.getCurrentQuantity());

        return productRepository.save(existingProduct);
    }

	public record Edge(Long source, Long target){};

	public record Node(Long id){};

	public record Graph(List<Node> nodes, List<Edge> edges){};

	public Graph getGraph(Product product){
		ArrayList <Node> nodes = new ArrayList<>();
		ArrayList <Edge> edges = new ArrayList<>();

		//Call recursive method to find all intermediaries and produce a graph
		findIntermediaries(product, nodes, edges);

		return new Graph(nodes, edges);
	}

	public void findIntermediaries( Product currentNode, ArrayList<Node> nodes, ArrayList<Edge> edges){
		//Add node to nodes array
		nodes.add(new Node(currentNode.getId()));

		//Base Case
		if (currentNode.getIntermediaryIds().size() == 0){
			return;
		}

		//Recursive Case
		List<Long> intermediaries = currentNode.getIntermediaryIds();

		for (Long id : intermediaries){
			for (Node node : nodes){
				if (id == node.id()){
					//Then node is already discovered
					break;
				}
			}
			//Node is not already discovered therefore add edge, then recursive call
			edges.add(new Edge(id, currentNode.getId()));

			findIntermediaries(productRepository.findById(id).get(), nodes, edges);
		}
	}

	public record TraceData(Graph graph,
						   String label,
						   String DateCreated,
						   ArrayList<String> Allergens
	){ }

	public TraceData getTraceabilityData(String id) throws Exception {
		//Check if the id is a valid number
		Product product = null;
		if (isLong(id)){
			//Query database
			Optional<Product> optional = productRepository.findById(Long.parseLong(id));
			if (optional.isEmpty()){
				throw new Exception("product with given id not found");
			}
			product = optional.get();
		}

		//Extract allergens
		ArrayList<String> allergens = extractAllergens(product);

		//Extract graph
		Graph graph = getGraph(product);

		//Extract other details
		String label = product.getLabel();;

		String date = "";

		//Return all data as record
		return new TraceData(graph, label, date, allergens);
	}
	
	public ArrayList<String> extractAllergens(Product product){
		//To be implemented:

		return new ArrayList<>();
	}
	public static boolean isLong(String strNum){
		if (strNum == null){ return false; }
		try {
			double l = Long.parseLong(strNum);
		} catch (NumberFormatException nfe){
			return false;
		}
		return true;
	}
}

