package com.avery.storage.entities;

import java.util.Comparator;

public class PartnerComprator extends Partner implements Comparator<Partner> {

	@Override
	public int compare(Partner partner, Partner partnerToCompare) {
		int comp=partner.getPartnerName().compareTo(partnerToCompare.getPartnerName());
		return comp;
	}

}
